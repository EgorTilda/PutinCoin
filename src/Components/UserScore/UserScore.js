import { Div, Title, Separator } from "@vkontakte/vkui";
import React from "react";
import "./UserScore.scss";
import coinImg from "./../../img/Coin-wh.svg";

const UserScore = ({ scoreValue }) => {
    return (
        <div className="score">
            <div className="score__content">
                <div className="score__value">
                    <div className="score__num">
                        {scoreValue}
                    </div>
                    <img className="score__img" src={coinImg} />
                </div>
            </div>
        </div>
    );
}

export default UserScore;