import md5 from 'js-md5'
// mergeFileAxios,
// uploadVideoChunkAxios,
// uploadCheckAxios,

import { bigUpload } from '@/apis/baseserver'
// pieceSize 每片大小
export const uploadByPieces = ({
  file,
  pieceSize = 5,
  success,
  error,
  uploading,
}) => {
  if (!file) return

  // const isLtSize = 500 //限制大小
  // const isLtSizeFlag = file.size / 1024 / 1024 <= 500
  // if (!isLtSizeFlag) {
  //   error && error(`请上传大小不超过${isLtSize}MB的文件`)
  //   return false
  // }
  // 上传过程中用到的变量
  let fileMD5 = '' // 总文件列表
  const chunkSize = pieceSize * 1024 * 1024 // 5MB一片
  const chunkCount = Math.ceil(file.size / chunkSize) // 总片数
  // 获取md5
  const readFileMD5 = () => {
    // 读取视频文件的md5
    console.log('获取文件的MD5值')
    let fileReaderInstance = new FileReader()
    // fileReaderInstance.readAsBinaryString(file)
    fileReaderInstance.readAsArrayBuffer(file)
    fileReaderInstance.addEventListener('load', (e) => {
      let fileBlob = e.target.result
      fileMD5 = md5(fileBlob)
      //   uploadCheckAxios({ md5: fileMD5 })
      //     .then((res) => {
      //       if (res.data.code == 0) {
      //         console.log('文件已被上传')
      //         console.log(res.data)
      //         success && success(res)
      //       } else {
      //         console.log('文件未被上传，将分片上传')
      //         readChunkMD5()
      //       }
      //     })
      //     .catch((e) => {
      //       console.log('文件合并错误')
      //       console.log(e)
      //     })
      readChunkMD5()
    })
  }
  let sliceSuccessTotal = 0
  const getChunkInfo = (file, currentChunk, chunkSize) => {
    let start = currentChunk * chunkSize
    let end = Math.min(file.size, start + chunkSize)
    let chunk = file.slice(start, end)
    return { start, end, chunk }
  }
  // 针对每个文件进行chunk处理
  const readChunkMD5 = () => {
    let promiseList = []
    // 针对单个文件进行chunk上传
    for (let i = 0; i < chunkCount; i++) {
      const { chunk } = getChunkInfo(file, i, chunkSize)
      console.log('总片数' + chunkCount)
      console.log('分片后的数据---测试：' + i)
      console.log(chunk)
      // uploadChunk({ chunk, currentChunk: i, chunkCount })
      promiseList.push({ chunk, currentChunk: i, chunkCount })
    }
    sendRequest(promiseList)
  }
  const uploadChunk = (chunkInfo) => {
    return new Promise((resolve, reject) => {
      const { currentChunk, chunkCount } = chunkInfo
      let fetchForm = new FormData()
      fetchForm.append('sliceIndex', currentChunk)
      fetchForm.append('totalPieces', chunkCount)
      fetchForm.append('md5', fileMD5)
      fetchForm.append('fileName', file.name)
      fetchForm.append('file', chunkInfo.chunk)
      bigUpload(fetchForm)
        .then((res) => {
          uploading && uploading(currentChunk / chunkCount)
          if (res.fullSuccess) {
            sliceSuccessTotal = 0
            success && success(res)
          } else {
            // 判断是不是调完了还是没有fullSuccess = true
            sliceSuccessTotal++
            if (sliceSuccessTotal === chunkCount) {
              error && error('上传失败, 请重新上传')
              reject()
            }
          }
          resolve()
        })
        .catch((e) => {
          error && error(e)
          reject()
        })
    })
  }
  // const uploadChunk = (chunkInfo) => {
  //   // fetchForm.append('file', chunkInfo.chunk)
  //   // fetchForm.append('chunkSize', chunkSize)
  //   const { currentChunk, chunkCount } = chunkInfo
  //   // progressFun()
  //   let fetchForm = new FormData()
  //   fetchForm.append('sliceIndex', currentChunk)
  //   fetchForm.append('totalPieces', chunkCount)
  //   fetchForm.append('md5', fileMD5)
  //   fetchForm.append('fileName', file.name)
  //   fetchForm.append('file', chunkInfo.chunk)
  //   bigUpload(fetchForm)
  //     .then((res) => {
  //       // let progress =
  //       //fail代表失败
  //       uploading && uploading(currentChunk / chunkCount)
  //       if (res.fullSuccess) {
  //         success && success(res)
  //         // console.log(chunkInfo.currentChunk, chunkInfo.chunkCount)
  //         // if (chunkInfo.currentChunk < chunkInfo.chunkCount - 1) {
  //         //   console.log('分片上传成功')
  //         // } else {
  //         // 当总数大于等于分片个数的时候
  //         // if (chunkInfo.currentChunk >= chunkInfo.chunkCount - 1) {
  //         //   console.log('文件开始------合并成功')
  //         //   mergeFileAxios({ md5: fileMD5, name: file.name })
  //         // .then((res) => {
  //         //   if (res.data.code == 0) {
  //         //     success && success(res)
  //         //     console.log('文件合并成功')
  //         //     console.log(res.data.data.url)
  //         //   } else {
  //         //     console.log(res.data.msg)
  //         //   }
  //         // })
  //         // .catch((e) => {
  //         //   console.log('文件合并错误')
  //         //   console.log(e)
  //         // })
  //         // }
  //         // }
  //       }
  //       if (res.sliceSuccess === false) {
  //         error && error('上传失败, 请重新上传')
  //       }
  //       console.log('currentChunk', currentChunk)
  //       console.log('chunkCount', chunkCount)
  //     })
  //     .catch((e) => {
  //       error && error(e)
  //     })
  // }
  const sendRequest = (requestList, limit = 5, callback) => {
    const promises = requestList.slice()
    const num = Math.min(requestList.length, limit)
    let concurrentCount = 0
    const runTask = () => {
      const task = promises.shift()
      task && runner(task)
    }
    const runTaskNeeded = () => {
      let i = 0
      while (i < num) {
        i++
        runTask()
      }
    }
    const runner = async (task) => {
      try {
        concurrentCount++
        await uploadChunk(task)
      } catch (error) {
        console.log('error')
      } finally {
        concurrentCount--
        pickerNext()
      }
    }
    const pickerNext = () => {
      if (concurrentCount < num && promises.length > 0) {
        runTask()
      } else if (promises.length === 0 && concurrentCount === 0) {
        callback && callback()
      }
    }
    runTaskNeeded()
  }
  readFileMD5() // 开始执行代码
}
