import { ModalRoot } from "@vkontakte/vkui";
import React, { Component } from "react";
import "./ModalMain.css";

class ModalMain extends Component {

    close = () => {
        const { setActiveModal } = this.props;   
        setActiveModal(null);
    }

    render() {
        const { activeModal } = this.props;
        return(
            <ModalRoot activeModal={activeModal}>

            </ModalRoot>
        )
    }
}