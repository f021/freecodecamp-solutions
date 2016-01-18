const { createStore, combineReducers, bindActionCreators } = Redux;
const { Component } = React;
const { Provider, connect } = ReactRedux;

const createAction = type => record => ({
  type: type,
  record
});

const addRecord = createAction('ADD_RECORD');
const delRecord = createAction('DELETE_RECORD');
const editRecord = createAction('EDIT_RECORD');
const setCurrent = (current) => ({
  type: 'SET_CURRENT',
  current: current
});
const setMode = (mode) => ({
  type: 'SET_MODE',
  mode: mode
})
const setBuffer = (key) => ({
  type: 'SET_BUFFER',
  ...key
})
const resBuffer = () => ({
  type: 'RESET_BUFFER'
});

const buffer = (state = {}, {type, ...rest}) => {
  switch (type) {
    case 'SET_BUFFER':
      return {...state, ...rest};
    case 'RESET_BUFFER':
      return {};
    default:
      return state;
  }
}

const commands  = {
  addRecord,
  delRecord,
  editRecord,
  setCurrent,
  setMode,
  setBuffer,
  resBuffer
}
// console.log(actions);

const isEmpty = (obj) =>
  Object.keys(obj).length === 0;

const conj = (arr, elm) =>
  [...arr, elm];

const drop = (arr, elm) => 
  arr.filter(e => e.id !== elm.id);

const records = (state = [], {type, record}) => {
  switch (type) {
    case 'ADD_RECORD':
      console.log(record);
      return conj(state, record);
    case 'DELETE_RECORD':
      return drop(state, record);
    case 'EDIT_RECORD':
      return conj(drop(state, record), record);
    default:
      return state;
  };
};

const current = (state = 0, action) => {
  switch (action.type) {
    case 'SET_CURRENT':
      return action.current;
    default:
      return state;
  }
};

const mode = (state = 'VIEW', action) => {
  switch (action.type) {
    case 'SET_MODE':
      return action.mode;
    default:
      return state;
  }
}

const reducer = combineReducers({
  records,
  current,
  mode,
  buffer
});

const store = createStore(reducer);

store.dispatch(addRecord({id: 0, title: 'hello', text: 'asdf asdfasdf'}))
store.dispatch(addRecord({id: 1, title: 'two', text: '123 123123'}))
store.dispatch(addRecord({id: 2, title: 'three', text: '123 2342'}))
store.dispatch(addRecord({id: 3, title: '33', text: '123 455 4545'}))
store.dispatch(setMode('EDIT'));
store.dispatch(setBuffer());
store.dispatch(setBuffer({title: 'one'}));
store.dispatch(setBuffer({title: 'two'}));
store.dispatch(setBuffer({title: 'three', text: 'hohoho'}));
store.dispatch(setBuffer({title: 'gooo', text: '111'}));
// store.dispatch(resBuffer());

const Record = ({id, title, text, actions}) => {
  return (
    <div style={{backgroundColor: 'grey'}}>
      <h1>{title}</h1>
      <ul>
        {text.split(' ').map(str => <li>{str}</li>)}
      </ul>
      <a href='#' onClick={() => actions.delRecord({id: id})}>Delete</a>
      <a href='#'>Edit</a>
    </div>
  );
}

const New = ({actions, mode, buffer}) => {
  console.log(buffer);
    if (mode === 'EDIT') {
    return (
      <form>
      <h1>{isEmpty(buffer) ? 'Add' : 'Edit'} a recipe</h1>
      <label><h6>Recipe:</h6>
        <input onInput={(e)=>
    actions.setBuffer({title: e.target.value})
    } placeholder='Recipe name' value={buffer.title}/>
      </label>
      <label><h6>Ingredients: </h6>
        <textarea onInput={(e)=>
    actions.setBuffer({text: e.target.value})}
value={buffer.text}/>
      </label>
      <a href="#" onClick={()=>actions.setMode('VIEW')}>CLOSE</a>
      {' '}
      <a href="#" onClick={()=>{actions.addRecord(buffer);
  actions.resBuffer();actions.setMode('VEIW');}
}>SAVE</a>
    </form>)
  } else {
    return (<a href='#' onClick={()=>actions.setMode('EDIT')}>new</a>)
  }

}

const List = ({records , current, actions, mode}) => {
  return (
        <div style={{opacity: mode !== 'EDIT' ? '1' : '.5'}}>
        {records.map(record =>
          (record.id !== current)
            ? <div onClick={()=>
               actions.setCurrent(record.id)}>{record.title}</div>
            : <Record {...record} actions={actions}/>)}
      </div>
  )
}

@connect(state => ({
  records: state.records,
  current: state.current,
  mode: state.mode,
  buffer: state.buffer
}))
class Main extends Component {
  
  static propTypes = {
    records: React.PropTypes.object.isRequred,
    current: React.PropTypes.number.isRequred,
    mode: React.PropTypes.oneOf(['EDIT', 'VIEW']).isRequired
  };

  render() {
    console.log(this.props);
    const actions = bindActionCreators(commands, this.props.dispatch);
    return (
      <div>
        <List actions={actions} {...this.props} />
        <New actions={actions} {...this.props}/>
      </div>
    );
  }
}

const App = () => (
  <Provider store={store}>
    <Main />
  </Provider>
);

ReactDOM.render(<App /> ,document.getElementById('root'))