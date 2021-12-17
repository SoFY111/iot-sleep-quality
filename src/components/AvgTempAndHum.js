const AvgTempAndHum = () => {
    return(
        <div className="p-8 ">
            <div className="bg-white p-6 rounded-lg shadow-lg border-l-3 border-red-500">
                <h2 className="text-2xl font-semibold mb-2 text-gray-800">Ortalama Nem ve Sıcaklık</h2>
                <div className="flex flex-col text-gray-500">
                    <label>Nem: 48%</label>
                    <label>Sıcaklık: 27.2C</label>
                </div>
            </div>
        </div>
    )
}

export default AvgTempAndHum
