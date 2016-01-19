const init = [
    {title: 'Яблочный пирог', text: 'яблоки, мука, яйца, алеся', id: 0},
      {title: 'Омлет', text: 'яйца, лук', id: 1},
      {title: 'Суп', text: 'картошка, морквоь', id: 2}
];

const { createStore, combineReducers, bindActionCreators } = Redux;
const { Component } = React;
const { Provider, connect } = ReactRedux;

const createAction = type => record => ({
  type: type,
  record
});

// const actionWithCounter = (action, counter = 0) => data => ({
//   action({...data, id: counter++})
// });

const countFn = (fn, counter = 3) => record => {
  if (typeof record.id === 'undefined') {
    return {
      ...fn({...record, id: counter++})
      };
    }
    return editRecord(record);
 }
const addRecord = countFn(createAction('ADD_RECORD'));
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

const records = (state = init, {type, record}) => {
  switch (type) {
    case 'ADD_RECORD':
      return [...state, record];
    case 'DELETE_RECORD':
      return state.filter(e => e.id !== record.id);
    case 'EDIT_RECORD':
      return state.map(e => e.id === record.id ? record : e);
    default:
      return state;
  };
};

const current = (state = null, action) => {
  switch (action.type) {
    case 'SET_CURRENT':
      return
        state === action.current
          ? null
          : action.current;
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

const reducer = combineReducers({ records, current, mode, buffer });
const store = createStore(reducer);
const commands  = { addRecord, delRecord, editRecord, setCurrent, setMode, setBuffer, resBuffer };

const RHeader = ({ record, actions }) => (
  <a className="list-group-item card-title"
    style={{ border:'none' }}
    onClick={ () => {
      actions.setCurrent(record.id)} }
  >
    { record.title }
  </a>
);

const RBody = ( {record, actions} ) => {
  return (
      <div className="card-text"
        style={{paddingTop: '1em'}}
      >
        <ul style={{listStyleType: 'none'}}>
          { record.text.split(',').map(ingredient => 
            <li>{ ingredient }</li>) }
        </ul>
        <RBtn record={ record } actions={ actions } />
      </div>
  )
}

const RBtn = ({ record, actions }) => (
  <div className="card-text text-xs-right">
    <a className="btn small cancel"
      href="#"
      onClick={ () =>
        actions.delRecord({ id: record.id }) }
    >
      DELETE
   </a>
    <a className='btn small edit'
      href="#"
      onClick={() => {
        actions.setBuffer({...record});
        actions.setMode('EDIT');}}
     >
      EDIT
     </a>
  </div>
);

const Record = (props) => {
  let active =  props.current === props.record.id;
  return (
    <div className='list-group card'
      style={styleCSS.active}
    >
      <RHeader {...props} />
      { active && <RBody {...props}/> }
    </div>
  );
};


const List = (props) => (
  <div className='card'>
    <div className="card-block">
      <h4 className="display-4">COOKBOOK</h4>
    </div>
    <div className="list-group" style={{padding: '2em'}}>
      { props.records.map(record =>
        <Record record={record} {...props}/>) }
    </div>
    <div className="card-block text-xs-right">
      <a className="btn big"
        href="#"
        onClick={ () => {
          props.actions.setCurrent(null);
          props.actions.setMode('EDIT')} }
      >
        +
      </a>
    </div>
  </div>
);

const Edit = ({ actions, buffer }) => {
  const close = () => {
    actions.resBuffer();
    actions.setMode('VIEW');
  };
  return (
    <div className="card">
        <h6 className="card-header">
          { typeof buffer.id === 'undefined' ? 'ADD' : 'EDIT' } A RECIPE
        </h6>
      <div className="card-block">
        <fieldset className="form-group">
          <label className="display-4">Recipe:</label>
          <input className="list-group-item form-control input-xs"
            type="text"
            placeholder="What do you want to cook?"
            onInput={ (e) =>
              actions.setBuffer({ title: e.target.value }) }
              value={buffer.title}
          />
          <label className="display-4">Ingredients:</label>
          <textarea className="form-control texarea-xs"
            placeholder="Give me ingredients, separated by coma..."
            onInput={ (e) =>
              actions.setBuffer({ text: e.target.value })}
            value={ buffer.text }
          />
        </fieldset>
      </div>
      <div className="card-block text-xs-right">
        <a className="btn"
          href="#"
          onClick={ close }
        >
          CANCEL
        </a>
        {' '}
        <a className="btn"
          href="#"
          onClick={ () => {
            actions.addRecord(buffer);
            close();} }
         >
           SAVE
         </a>
      </div>
    </div>
  );
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
    const actions = bindActionCreators(commands, this.props.dispatch);
    return (
      <div className='row'>
        { 
          (this.props.mode === 'VIEW') 
            ? <List actions={actions} {...this.props} />
            : <Edit actions={actions} {...this.props } />
        }
      </div>
    );
  }
}

const App = () => (
  <Provider store={ store }>
    <Main />
  </Provider>
);

ReactDOM.render(<App /> ,document.getElementById('root'))

const styleCSS = {
  active: {
    backgroundColor: 'rgba(200,200,200, 1)',
    borderLeft: '2px solid red'
  }
};