export default (context, inject) => {
  const util = {
    /**
     * Get form data
     *
     * @param {Object} data
     * @param {Array} requiredFields
     * @param {Array} optionalFields
     * @return {Object} form data
     */
    getFormData: (data, requiredFields = [], optionalFields = []) => {
      const form = {}
      requiredFields.forEach(key => {
        if (data[key] !== undefined && data[key] !== null && data[key] !== '') {
          form[key] = data[key]
        }
      })
      optionalFields.forEach(key => {
        form[key] = data[key]
      })
      return form
    }
  }

  inject('util', util)
}
