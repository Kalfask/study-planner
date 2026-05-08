import React from "react";

function ProductivityByDay({ data }) {
    const maxScore = Math.max(...data.map((item) => item.score), 1);

    return (
        <div className="stats-widget-card">
            <div className="stats-widget-header">
                <h3>Productivity by Day</h3>
            </div>

            <div className="productivity-grid">
                {data.map((item) => {
                    const heightPercent = Math.max((item.score / maxScore) * 100, 8);

                    return (
                        <div key={item.day} className="productivity-item">
                            <div className="productivity-bar-wrap">
                                <div
                                    className="productivity-bar"
                                    style={{ height: `${heightPercent}%` }}
                                />
                            </div>
                            <strong>{item.score}</strong>
                            <span>{item.day}</span>
                        </div>
                    );
                })}
            </div>

            <p className="stats-small-note">
                Based on focus time and consistency across the week.
            </p>
        </div>
    );
}

export default ProductivityByDay;