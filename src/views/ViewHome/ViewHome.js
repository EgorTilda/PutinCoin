import { Div, Panel, PanelHeader, SimpleCell, Title, View } from "@vkontakte/vkui";
import React from "react";
import "./ViewHome.scss";

const ViewHome = ({ id, activePanel, popout }) => {
    return(
        <View id={id} popout={popout} activePanel={activePanel}>
            <Panel id="main">
                <PanelHeader separator={false}></PanelHeader>
                <Div align="center">
                    <Title level="1">1,001</Title>
                </Div>
            </Panel>
        </View>
    );
}

export default ViewHome;