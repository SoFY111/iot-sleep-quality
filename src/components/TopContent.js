import LastUpdatedCard from "./LastUpdatedCard";
import AvgTempAndHum from "./AvgTempAndHum";
import LastNightAvgTempAndHum from "./LastNightAvgTempAndHum";
import SumData from "./SumData";

const TopContent = () => {
    return(
        <div className="flex flex-row align-center justify-around">
            <AvgTempAndHum />
            <LastNightAvgTempAndHum />
            <LastUpdatedCard />
            <SumData />
        </div>
    )
}

export default TopContent
