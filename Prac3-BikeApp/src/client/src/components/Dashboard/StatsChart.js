import React, { Component } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import ResponsiveContainer from "recharts/lib/component/ResponsiveContainer";

class StatsLineChart extends Component {
    render() {
        return (
            <div>
                <ResponsiveContainer width="99%" height={320}>
                    <LineChart data={this.props.data}>
                        <Line
                            type="monotone"
                            dataKey="distance"
                            stroke="#B22222"   
                        />
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis dataKey="start_time" />
                        <YAxis />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        );
    }
}

export default StatsLineChart;
