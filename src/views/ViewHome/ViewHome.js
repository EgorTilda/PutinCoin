import { Button, Card, CardGrid, Div, Panel, PanelHeader, Separator, Title, View } from "@vkontakte/vkui";
import { Icon28ListCheckOutline, Icon28DocumentOutline } from '@vkontakte/icons';
import React from "react";
import "./ViewHome.scss";
import UserScore from "./../../Components/UserScore/UserScore";
import "./ViewHome.scss"

const ViewHome = ({ id, activePanel, popout, globState, setActiveModal, modal, snackbar }) => {
    const { user } = globState;
    const score = user ? (user.score / 1000).toFixed(3) : "Загрузка...";
    const addScore = user ? (user.add_score / 1000).toFixed(3) : "Загрузка...";
    return (
        <View id={id} popout={popout} activePanel={activePanel} modal={modal}>
            <Panel className="main" id="main">
                {user &&
                    <UserScore scoreValue={score.toString().replace(".", ",")} addScore={addScore} />
                }

                <div className="card-nav">
                <CardGrid size="m">
                        <Card className="card card--left" onClick={() => setActiveModal("stocks")}>
                            <div className="card__content">
                                <Icon28ListCheckOutline fill="#fff" />
                                <div className="card__title">Задания</div>
                            </div>

                        </Card>
                        <Card className="card card--right">
                            <div className="card__content">
                                <Icon28DocumentOutline fill="#fff" />
                                <div className="card__title">Акции</div>
                            </div>
                        </Card>
                    </CardGrid>
                </div>
                {snackbar}
            </Panel>
        </View>
    );
}

export default ViewHome;