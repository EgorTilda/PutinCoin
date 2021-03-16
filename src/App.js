import React, { Component } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { VKMiniAppAPI } from "@vkontakte/vk-mini-apps-api";
import { io } from "socket.io-client"
import { AdaptivityProvider, AppRoot, ConfigProvider, Epic, Tabbar, TabbarItem, ScreenSpinner, withAdaptivity, Alert } from '@vkontakte/vkui';
import { Icon28HomeOutline, Icon28MoneyTransfer, Icon28MoneyTransferOutline, Icon28PollSquareOutline } from "@vkontakte/icons";
import '@vkontakte/vkui/dist/vkui.css';



import ViewHome from './views/ViewHome/ViewHome';
import ViewTransfer from './views/ViewTransfer/ViewTransfer';
import ViewStaics from './views/ViewStatics/ViewStatics';

const api = new VKMiniAppAPI();

class App extends Component {

	state = {
		activeStory: "home",
		activePanel: "main",
		popout: <ScreenSpinner />,
		snackbar: null,
		globState: {
			api: null,
			user: null
		}
	}

	componentDidMount() {
		api.initApp();
		const socket = io("wss://81.177.136.143:3000" + window.location.search , { transports: ["websocket"], autoConnect: false } );
		socket.connect();
		socket.on("init", this.init)
		socket.on("two_source", () => {
			this.setPopout(
				<Alert 
					header="Ошибка" 
					text="Вы уже подключены с другого устройства!"
					onClose={() => {
						this.setPopout(<ScreenSpinner />)
						socket.open();
					}} 
					actions={[
						{
							title: "Поробовать снова",
							action: () => {
								this.setPopout(<ScreenSpinner />)
								socket.open();
							}
						}
					]} 
				/>)
		})
		socket.onAny((data) => {
			console.log(data)
		})
		this.setGlobState({ api, socket });
	}

	onMessage = (data) => {
		console.log(data)
	}

	init = (data) => {
		this.setPopout(null)
		this.setGlobState({ user: { ...data, id: undefined } });
		this.state.globState.socket.on("updated_score", score => {
			this.setGlobState({ user: { ...this.state.globState.user, score }});
		})
		setInterval(() => {
			this.state.globState.socket.emit("add_score_timer");
		}, 1000);
		
	}

	onclose = (e) => {
	
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
		const { activePanel, activeStory, popout, globState, snackbar } = this.state;
		return(
			<ConfigProvider >
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


							<ViewHome 
								id="home" 
								activePanel={activePanel}
								popout={popout}
								snackbar={snackbar}
								globState={globState}
								setGlobState={this.setGlobState}
								setPopout={this.setPopout}
								setSnackbar={this.setSnackbar}
							/>

							<ViewTransfer 
								id="transfer" 
								activePanel={activePanel} 
								popout={popout}
								snackbar={snackbar}
								globState={globState}
								setGlobState={this.setGlobState}
								setPopout={this.setPopout}
								setSnackbar={this.setSnackbar}
							/>

							<ViewStaics 
								id="statics" 
								activePane={activePanel} 
								popout={popout}
								snackbar={snackbar}
								globState={globState}
								setGlobState={this.setGlobState}
								setPopout={this.setPopout}
								setSnackbar={this.setSnackbar}
							/>

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

