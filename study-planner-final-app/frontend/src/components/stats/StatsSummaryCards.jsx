import React from "react";

function StatsSummaryCards({ summary }) {
    const periodLabel = summary.periodLabel || "This Week";
    const hours =
        summary.totalStudyHoursPeriod ?? summary.totalStudyHoursThisWeek ?? 0;

    const cards = [
        {
            label: `Study Hours ${periodLabel}`,
            value: `${hours}h`
        },
        {
            label: "Completed Tasks",
            value: summary.completedTasks
        },
        {
            label: "Current Streak",
            value: `${summary.currentStreak} days`
        },
        {
            label: "Best Day",
            value: summary.bestDay
        }
    ];

    return (
        <div className="stats-summary-grid">
            {cards.map((card) => (
                <div key={card.label} className="stats-summary-card">
                    <span>{card.label}</span>
                    <strong>{card.value}</strong>
                </div>
            ))}
        </div>
    );
}

export default StatsSummaryCards;