var redux = require('redux');

var stateDefault = {
		searchText:'',
		showCompeted:false,
		todos:[]	
}

var reducer = (state = stateDefault,action) =>{
	switch(action.type){
		case 'CHANGE_SEARCH_TEXT':
			return{
				...state,
				searchText:action.searchText

			};
		default:
			return state;
	}
}
//This is how we wire up the redux dev tools by passing in redux.compse into create store
//and then window.devToolsExtension ? window.devToolsExtension():f=>f

var store = redux.createStore(reducer,redux.compose(

	window.devToolsExtension ? window.devToolsExtension():f=>f
));


//SUBSCRIBE TO CHANGE
var subscribe = store.subscribe(()=>{
	var state = store.getState();

	document.getElementById('app').innerHTML = state.searchText;
});

var currentState = store.getState();

console.log('currentState',currentState);

store.dispatch({
	type:'CHANGE_SEARCH_TEXT',
	searchText:'work'
});

store.dispatch({
	type:'CHANGE_SEARCH_TEXT',
	searchText:'chicken butt'
});
store.dispatch({
	type:'CHANGE_SEARCH_TEXT',
	searchText:'i love blue bottle'
});


//Question.........................
//1 HOw man reducers can you have in one prpgram
//2 are the things that i need to do in order to change the state of an object
//3 is each state change going to require one action 


//Egg Head IO Example -------------------------------------------------
// function counter(state = 0,action){
//   if(action.type ==="INCREMENT"){
//     return state + 1;
//   }
//   else if(action.type ==="DECREMENT"){
//     return state - 1;
//   }
//   else{
//     return state;
//   }
// }

// var createStore = redux.createStore;
// var store = createStore(counter);
// console.log(store.getState());

// store.dispatch({type:"INCREMENT"});
// console.log(store.getState());

// var render = ()=>{
	
// 	document.body.innerText = store.getState();
// }

// store.subscribe(render);
// render();

// document.addEventListener('click',()=>{
// 	store.dispatch({type:"INCREMENT"});
// });
