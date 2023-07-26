export interface PieChartProps {
    title: string,
    value: number,
    series: Array<number>
    colors: Array<string>
}

export interface SimpleChartProps {
    title: string,
    value: number,
    src: string,
    text: string
}

export interface FoodChartProps {
    title: string,
    value: number,
    src: string,
    text: string,
    text2: string
}
