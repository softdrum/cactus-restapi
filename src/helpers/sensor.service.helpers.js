module.exports = {
  normalizeDatasetsForLineChart (datasetsObject) {
    return Object.keys(datasetsObject).map(key => {
      return {
        label: key,
        data: datasetsObject[key]
      }
    })
  },
  convertDataArrayToObject (data) {
    let datasetsObject = {}
    let timeLabels = []
    data.forEach(element => {
      let sensorsData = element.data
      // console.log(typeof element.createdAt); .toISOString()
      timeLabels.push(element.createdAt)
      sensorsData.forEach(sensor => {
        let sensorName = sensor.name
        let sensorValue = sensor.value
        if (typeof sensorValue === 'number') {
          if (Array.isArray(datasetsObject[sensorName])) {
            datasetsObject[sensorName].push(sensorValue)
          } else {
            datasetsObject[sensorName] = []
            datasetsObject[sensorName].push(sensorValue)
          }
        } else {
          Object.keys(sensorValue).forEach(param => {
            let seriesKey = `${sensorName}-${param}`
            if (Array.isArray(datasetsObject[seriesKey])) {
              datasetsObject[seriesKey].push(sensorValue[param])
            } else {
              datasetsObject[seriesKey] = []
              datasetsObject[seriesKey].push(sensorValue[param])
            }
          })
        }
      })
    });
    return {
      datasetsObject,
      timeLabels
    }
  }
}