export class AlertFormatter {
    static fromatText(sensorData) {
        return `[ALERT] Sensor ${sensorData.id} exceeded limit! Value: ${sensorData.reading}`
    }

    static formatHtml(sensorData) {
        return `<h1>Alert</h1><p>Sensor <b>${sensorData.id}</b> reached <i>${sensorData.reading}</i></p>`;
    }

    static formatSocialMedia(sensorData) { }
}

