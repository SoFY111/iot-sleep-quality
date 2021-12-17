import React from "react";
import {firestoreAppDb} from "../firebaseConfig";
import {red} from "@tailwindcss/postcss7-compat/colors";

class RightContent extends React.Component {

    state = {
        data: [],
        months: ["Ocak", "Şubat", 'Mart', 'Nisan', `Mayıs`, 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
        weekday: ["Pazartesi", "Salı", "Çarşamba", "Perşmembe", "Cuma", "Cumartesi", "Pazar"]
    }

    componentDidMount() {
        firestoreAppDb.collection('data')
            .orderBy('date', 'desc')
            .limit(1)
            .onSnapshot(days => {
                days.forEach(day => {
                    this.callLastDayDatas(day.id)
                })
            })
    }

    callLastDayDatas = (day) => {
        firestoreAppDb.collection('data')
            .doc(day)
            .collection(day)
            .limit(57)
            .onSnapshot(days => {
                let counter = 0, allData = [], utcDay;
                days.forEach(day => {
                    counter++;
                    const newDateTimestamp = day.id * 1000;
                    const utcDate = (new Date(newDateTimestamp)).toUTCString();
                    if (counter === 1) utcDay = this.state.weekday[new Date(utcDate).getUTCDay()]
                    const lastDate = (new Date(utcDate).getDate() - 1) + " " + this.state.months[(new Date(utcDate).getMonth())] + " " + new Date(utcDate).getFullYear() + " " + utcDay + " 0" + new Date(utcDate).getHours() + ":" + new Date(utcDate).getMinutes();
                    allData.push({
                        date: lastDate,
                        temp: day.data().temp,
                        humadity: day.data().humadity
                    });
                })
                this.setState({
                    data: allData
                })
            })
    }

    calcPercent = () => {
        let counter = 0, redCounter = 0, greenCounter = 0;
        this.state.data.forEach(day => {
            counter++;
            if (day.humadity >= 33 && day.humadity <= 50) greenCounter++
            else redCounter++
            if(day.temp >= 15 && day.temp <= 33) greenCounter++
            else redCounter++
        })
        return ((greenCounter/(counter*2)) * 100).toFixed(2)
    }

    render() {
        return (
            <div className="flex flex-row manuelHeight bg-white p-3 rounded-md shadow-md">
                <button onClick={this.calcPercent}>percent</button>
                <div className="ContentSectionLeftSide w-3/4">
                    <label className="">Son Geceki Verileriniz</label>
                    <div className="manuelHeightV2 overflow-auto">
                        <div className="flex flex-col">
                                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                    <div className="overflow-hidden sm:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Saat
                                                </th>
                                                <th scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Nem
                                                </th>
                                                <th scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Sıcaklık
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                            {this.state.data.map((day, index) => (
                                                <tr key={index}>
                                                    <td className="py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900">
                                                                    {day.date}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {day.humadity >= 33 && day.humadity <= 50 ?
                                                            <div className="font-medium text-sm text-bootstrapSuccess">%{day.humadity}</div>
                                                            :
                                                            <div className="font-medium text-sm text-bootstrapDanger">%{day.humadity}</div>
                                                        }
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {day.temp >= 24 && day.temp <= 58 ?
                                                            <div className="font-medium text-sm text-bootstrapSuccess">{day.temp}C</div>
                                                            :
                                                            day.temp <=10 && day.temp >= 30 ?
                                                            <div className="font-medium text-sm text-bootstrapDanger">{day.temp}C</div>
                                                            :
                                                            <div className="font-medium text-sm text-bootstrapSecondary">{day.temp}C</div>
                                                        }
                                                    </td>
                                                </tr>
                                            ))}

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
                <div className="ContentSectionRightSide w-1/4 flex flex-col justify-center items-center">
                    <label className="text-5xl">
                        %{this.calcPercent()}
                    </label>
                </div>
            </div>
        )
    }
}

export default RightContent
