import React from "react";

function WidgetCard({title,children,className=""}){
    return(
        <div className={`widget-card ${className}`}>
            <div className="widget-card-header">
                <h3>{title}</h3>
            </div>
            <div className="widget-card-body">{children}</div>
        </div>
    );
}

export default WidgetCard;