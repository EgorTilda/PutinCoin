import { Div, Title, Separator } from "@vkontakte/vkui";
import React from "react";
import "./UserScore.scss";
import coinImg from "./../../img/Coin-wh.svg";

const UserScore = ({ scoreValue, addScore }) => {
    return (
        <div className="score">
            <div className="score__content">
                <div className="score__value">
                    <div className="score__num">
                        {scoreValue}
                    </div>
                    <img className="score__img" src={coinImg} />
                </div>
                <span className="score__desc">+{addScore} P</span>
            </div>
        </div>
    );
}

export default UserScore;