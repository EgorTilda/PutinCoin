import { Button, Div, Panel, PanelHeader, SimpleCell, Title, View } from "@vkontakte/vkui";
import React from "react";
import "./ViewHome.scss";
import UserScore from "./../../Components/UserScore/UserScore";

const ViewHome = ({ id, activePanel, popout, globState }) => {
    const { user } = globState;
    const score = user ? (user.score/100).toFixed(3) : null;
    return(
        <View id={id} popout={popout} activePanel={activePanel}>
            <Panel id="main">
                <PanelHeader separator={false}></PanelHeader>
                {user && 
                    <Div align="center">
                        <UserScore scoreValue={score}/>
                    </Div>
                }
            </Panel>
        </View>
    );
}

export default ViewHome;