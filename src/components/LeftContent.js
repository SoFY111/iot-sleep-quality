import React from "react";

class LeftContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sdA: props.sevenDaysAvg
        }
    }

    asd = (date) => {
        const newDateTimestamp = date * 1000;
        const utcDate = (new Date(newDateTimestamp)).toUTCString();
        return (new Date(utcDate).getDate() - 1) + "/" + (new Date(utcDate).getMonth() + 1) + "/" + new Date(utcDate).getFullYear();
    };


    render(){
        return (
            <div className="leftContent w-1/5 ">
                <div className="flex flex-col bg-white mr-11 p-3 rounded-md shadow-md">
                    <div className="flex flex-row justify-between border-b border-gray-300 pb-2">
                        <label>{'Son 7 gün istatistikleri '.toUpperCase()}</label>
                        <button className="btn font-bold" onClick={() => {
                            this.setState({sdA: this.props.sevenDaysAvg})
                        }}>Yenile
                        </button>
                    </div>
                    <div className="pl-1 mt-2 flex flex-col">
                            {this.state.sdA.map((day, index) => (
                                <div className="flex flex-row content-center items-center justify-around">
                                    <label key={index}>{this.asd(day.date)}</label>
                                    {day.avgHum >= 33 && day.avgHum <= 50 ?
                                        <div className="font-medium text-sm text-bootstrapSuccess">%{day.avgHum}</div>
                                        :
                                        <div className="font-medium text-sm text-bootstrapDanger">%{day.avgHum}</div>
                                }
                                {day.avgHeat >= 24 && day.avgHeat <= 58 ?
                                <div className="font-medium text-sm text-bootstrapSuccess">{day.avgHeat}C</div>
                                :
                                day.avgHeat <=10 && day.avgHeat >= 30 ?
                                    <div className="font-medium text-sm text-bootstrapDanger">{day.avgHeat}C</div>
                                    :
                                    <div className="font-medium text-sm text-bootstrapSecondary">{day.avgHeat}C</div>
                                }
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default LeftContent
