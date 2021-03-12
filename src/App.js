import React, { Component } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import { AdaptivityProvider, AppRoot, ConfigProvider, Epic, Tabbar, TabbarItem, Panel, withAdaptivity } from '@vkontakte/vkui';
import { Icon28HomeOutline, Icon28MoneyTransfer, Icon28MoneyTransferOutline, Icon28PollSquareOutline } from "@vkontakte/icons";
import '@vkontakte/vkui/dist/vkui.css';



import ViewHome from './views/ViewHome/ViewHome';
import ViewTransfer from './views/ViewTransfer/ViewTransfer';
import ViewStaics from './views/ViewStatics/ViewStatics';


class App extends Component {

	state = {
		activeStory: "home",
		activePanel: "main",
		popout: null,
		snackbar: null,
		globState: {

		}
	}

	setGlobState = (e) => {
		const { globState} = this.state;
		this.setState({ globState: { ...globState, ...e }})
	}

	setPopout = (popout) => {
		this.setState({ popout })
	}

	setSnackbar = (snackbar) => {
		this.setState({ snackbar })
	}

	onChangeStory = (activeStory) => {
		this.setState({ activeStory, activePanel: "main" });
	}
	
	go = (activePanel) => {
		this.setState({ activePanel });
	}
	
	render() {
		const { activePanel, activeStory } = this.state;
		return(
			<ConfigProvider>
				<AdaptivityProvider>
					<AppRoot>
						<Epic activeStory={activeStory} tabbar={
							<Tabbar>
								<TabbarItem selected={activeStory === "home"} onClick={() => this.onChangeStory("home")}>
									<Icon28HomeOutline />
								</TabbarItem>
								<TabbarItem selected={activeStory === "transfer"} onClick={() => this.onChangeStory("transfer")}>
									<Icon28MoneyTransferOutline />
								</TabbarItem>
								<TabbarItem selected={activeStory === "statics"} onClick={() => this.onChangeStory("statics")}>
									<Icon28PollSquareOutline />
								</TabbarItem>
							</Tabbar>
						}>


							<ViewHome id="home" activePanel={activePanel} />

							<ViewTransfer id="transfer" activePanel={activePanel} />

							<ViewStaics id="statics" activePane={activePanel} />

						</Epic>
					</AppRoot>
				</AdaptivityProvider>
			</ConfigProvider>
		)
	}
}


export default withAdaptivity(App, {
	viewWidth:true
})

