import Axios from 'axios'

// This is the shape of the payload
// let payload = new FormData()
// payload.append('image_type', ocrDocMap[documentType] + '_' + side)
// payload.append('image', file)
// payload.append('source', 'camera')

/**
 * The inhouse OCR api logic
 * @param {FormData} payload The file to read
 */
export const callImageOcrUploadApi = async () => {
  const ocrData = {
    status: 200,
    data: {
      data: {
        gender: 'MALE',
        dob: '09/07/1987',
        name: 'Ashish'
      }
    }
  }
  return ocrData
}

export const callJourneyStartApi = async payload => {
  return Axios.post(`${process.env.PN_END_POINT}journey/start`, payload)
}

