import { Button, Div, Panel, PanelHeader, SimpleCell, Title, View } from "@vkontakte/vkui";
import React from "react";
import "./ViewHome.scss";

const ViewHome = ({ id, activePanel, popout, globState }) => {
    const { user } = globState;
    const score = user ? (user.score/100).toFixed(3) : null;
    return(
        <View id={id} popout={popout} activePanel={activePanel}>
            <Panel id="main">
                <PanelHeader separator={false}></PanelHeader>
                {user && 
                    <Div align="center">
                        <Title level="1">{score}</Title>
                        <span className="scoreText__bottom">+1.273</span>
                        {/* <Button mode="tertiary" size="m" className="score__quest">Есть вопросы?</Button> */}
                    </Div>
                }
            </Panel>
        </View>
    );
}

export default ViewHome;