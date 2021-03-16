import { Div, Title, Separator } from "@vkontakte/vkui";
import React from "react";
import "./UserScore.scss";
import coinImg from "./../../img/Coin.svg";

const UserScore = ({ scoreValue }) => {
    return (
        <div className="score">
            <Div className="score__wrapper">
                <Title className="score__value" level="1">{scoreValue}</Title>
                <Div className="score__coin">
                    <img className="score__img" src={coinImg} alt="Путин Коин" />
                </Div>
            </Div>
            <Separator style={{ margin: '12px 0' }} />
        </div>
    );
}

export default UserScore;