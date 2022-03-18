const domain = 'http://localhost:5000'

const diagnosis = `${domain}/diagnosis`

export const send_symptoms = `${diagnosis}/send_symptoms`
export const get_all_keywords = `${diagnosis}/get_all_keywords`
export const send_selected_keywords = `${diagnosis}/send_selected_keywords`
export const get_diagnosis_result = `${diagnosis}/get_diagnosis_result`