import { Button, Card, CardGrid, Div, Panel, PanelHeader, Separator, Title, View } from "@vkontakte/vkui";
import React from "react";
import "./ViewHome.scss";
import UserScore from "./../../Components/UserScore/UserScore";

const ViewHome = ({ id, activePanel, popout, globState }) => {
    const { user } = globState;
    const score = user ? (user.score/1000).toFixed(3) : null;
    return(
        <View id={id} popout={popout} activePanel={activePanel}>
            <Panel id="main">
                <PanelHeader separator={false}></PanelHeader>
                {user &&       
                    <UserScore scoreValue={score}/>
                }
                <Separator style={{ margin: '12px 0' }} />


                <CardGrid size="m">
                    <Card>
                        <div style={{ paddingBottom: '62%' }} />
                    </Card>
                    <Card>
                        <div style={{ paddingBottom: '62%' }} />
                    </Card>
                </CardGrid>
            </Panel>
        </View>
    );
}

export default ViewHome;