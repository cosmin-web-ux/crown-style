import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop';
import Header from './components/header/header';
import SignInAndSignOut from './pages/sign-in-and-sign-up/sign-in-and-sign-up';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends Component {
	constructor() {
		super();

		this.state = {
			currentUser: null,
		};
	}

	unsubscribeFromAuth = null;

	componentDidMount() {
		this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
			if (userAuth) {
				const userFef = await createUserProfileDocument(userAuth);
				userFef.onSnapshot((snapShot) => {
					this.setState(
						{
							currentUser: snapShot.id,
							...snapShot.data(),
						},
						() => console.log(this.state)
					);
				});
			} else {
				this.setState({ currentUser: userAuth });
			}
		});
	}

	componeneWillUnmount() {
		this.unsubscribeFromAuth();
	}

	render() {
		return (
			<BrowserRouter>
				<Header currentUser={this.state.currentUser} />
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route path="/shop" component={ShopPage} />
					<Route path="/signin" component={SignInAndSignOut} />
				</Switch>
			</BrowserRouter>
		);
	}
}

export default App;
