import { Panel, View } from "@vkontakte/vkui";
import React from "react";
import "./ViewHome.css";

const ViewHome = ({ id, activePanel }) => {
    return(
        <View id={id} activePanel={activePanel}>
            <Panel id="main">
                ff
            </Panel>
        </View>
    );
}

export default ViewHome;