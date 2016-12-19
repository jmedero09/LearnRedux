//create store takes one argument which needs to be a pure function 
//This argument will be a reducer 
//A reducer takes ur exsiting state and action as arguments and computes the new state

//Basic reducer is just a function which we will pass into create store, create store requires this function
//State is the existing state before the action was triggered
//Also want a defeault 
//state = {name:'Anonymous'} this is us setting a defualt
//1 has a defualt state
//2 retunrs state even if their is no action on if its an action it does not recognize 

var redux = require('redux');

console.log('Starting redux example');

var stateDefault = {
	name:'Anonymous',
	hobbies:[],
	movies:[]
};
var nextHobbyId = 1;
var nextMovieId = 1;

var reducer = (state = stateDefault,action)=>{
	//state = state || {name:'Anonymous'}
	switch(action.type){
		case'CHANGE_NAME':
			return{
				...state,
				name:action.name
			};
		case 'ADD_HOBBY':
			return{
				...state,
				hobbies:[
				...state.hobbies,
					{	
						id:nextHobbyId++,
						hobby:action.hobby
					}
				]
			};
		case 'REMOVE_HOBBY':
			return{
				//return all the properties from are existing state 
				//then we follow up with what we want to change in our 
				//hobbies array
				...state,

				//return true keeps items false removes item
				//keeping every hooby that does not match the
				//action id
				hobbies:state.hobbies.filter((hobby)=>hobby.id !== action.id)
			};
					
		case 'ADD_MOVIE':
			return{
				...state,
				movies:[
					...state.movies,
					{
						id:nextMovieId++,
						title:action.title,
						genre:action.genre

					}
				]
			};
		case 'REMOVE_MOVIE':
			return{
				...state,

				movies:state.movies.filter((movie)=>movie.id !== action.id)
			};

		default:{
			return state;
		}
	}
}
var store = redux.createStore(reducer,redux.compose(
	window.devToolsExtension ? window.devToolsExtension():f => f
));

//SUBSCRIBE TO CHANGE
var unsubscribe = store.subscribe(()=>{
	var state = store.getState();

	console.log('name is ',state.name);
	document.getElementById('app').innerHTML = state.name

	console.log('New State ', store.getState());
});
//unsubscribe();

//return our state object which shoudl be anonymous
var currentState = store.getState();
store.dispatch({
	type:'CHANGE_NAME',
	name:'Olivia'
});
store.dispatch({
	type:'ADD_HOBBY',
	hobby:'running'
});
store.dispatch({
	type:'ADD_HOBBY',
	hobby:'rock climbing'
});
store.dispatch({
	type:'ADD_HOBBY',
	hobby:'Barista'
});

store.dispatch({
	type:'REMOVE_HOBBY',
	id:2
});
store.dispatch({
	type:'ADD_MOVIE',
	title:'Rocky 1',
	genre:'Fighting'
});
store.dispatch({
	type:'ADD_MOVIE',
	title:'Gods Not Dead',
	genre:'Christian'
});

store.dispatch({
	type:'REMOVE_MOVIE',
	id:1
});


