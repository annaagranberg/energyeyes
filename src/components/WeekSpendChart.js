import { VictoryChart, VictoryTheme, VictoryAxis, VictoryBar } from 'victory';

// Example of the data it takes, the day and its respective spending amount
const sampleData = [    
  {days: 1, spendings: 13000},    
  {days: 2, spendings: 16500},    
  {days: 3, spendings: 14250},    
  {days: 4, spendings: 19000},    
  {days: 5, spendings: 14250},    
  {days: 6, spendings: 10250},    
  {days: 7, spendings: 12250}];


// Returns a Victory graph that show the weekly spending
function WeekSpendChart() {
    return (
        <VictoryChart
            // adding the material theme provided with Victory
            theme={VictoryTheme.material}
            domainPadding={20}
            height={400} 
            width={600}
        >
            <VictoryAxis
                tickValues={[1, 2, 3, 4, 5, 6, 7]}
                tickFormat={["M", "T", "O", "T", "F", "L", "S"]}
                style={{
                    axisLabel: {fontSize: 16},
                    tickLabels: {fontSize: 35}
                }}
            />
            <VictoryAxis
                dependentAxis
                tickFormat={(x) => (`${x / 1000}`)}
                style={{
                    axisLabel: {fontSize: 16},
                    tickLabels: {fontSize: 25}
                }}
            />

            <VictoryBar
                    data={sampleData.map(({ days, spendings }) => ({
                    days,
                    spendings,
                    color: spendings > 15000 ? "#D9B44A" : "#125447"
                    }))}
                    x="days"
                    y="spendings"
                    style={{
                    data: {
                        fill: (d) => d.datum.color,
                        width: 20 // Increase the width of the bars for better visibility
                    }
                    }}
                />
                </VictoryChart>
    )
}

export default WeekSpendChart;
