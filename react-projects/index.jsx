const mySort = ({ a, b, key}) => 
  (typeof a[key] === 'number')
    ? a[key] - b[key]
    : (a[key] > b[key]) ? 1 : -1;

const reverse = (flag, arr) =>
  flag ? arr.reverse() : arr;

const Header = () => (
  <tr>
    <th colSpan='5' style={{backgroundColor: 'green'}}>
      <a style={{backgroundColor: 'green'}} href='http://www.freecodecamp.com/'>
        <img className ='img-responsive' src='https://s3.amazonaws.com/freecodecamp/freecodecamp_logo.svg' />
      </a>
    </th>
  </tr>
);

const FilterLink = ({filterBy, children, filter, onClick, reverse}) => (
  (filterBy === filter)
    ? <a href='#' onClick={onClick}>{children}{' '}{reverse ? '▼' : '▲'}</a>
    : <span style={{cursor: 'pointer'}} onClick={() => onClick(filter)}>{children}</span>
);

const THead = (props) => (
  <thead>
    <Header />
    <tr>
      <th className='col-md-1 text-center'>#</th>
      <th className='col-md-5'>
        <FilterLink filter='username' {...props}>users</FilterLink>
      </th>
      <th className='col-md-3 text-center'>
        <FilterLink filter='recent' {...props}>last 30 days</FilterLink>
      </th>
      <th className='col-md-3 text-center'>
        <FilterLink filter='alltime' {...props}>all time</FilterLink>
      </th>
    </tr>
  </thead>
);

const TRow = ({ index, img, username, recent, alltime }) => (
  <tr>
    <td className='text-center text-muted'>{index}</td>
    <td>
      <a className='avatar' href={'http://www.freecodecamp.com/' + username} target='_blank'>
        <img className='img-circle' style={{height: '30px'}} src={img} />
        <span style={{paddingLeft: '2em'}}>{username}</span>
      </a>
    </td>
    <td className='text-center'>{recent}</td>
    <td className='text-center'>{alltime}</td>
  </tr>
);

const TBody = ({ users }) => (
  <tbody>
    {users.map( (user, index) =>
      <TRow {...user} index={index + 1} /> )}
  </tbody>
);

class Table extends React.Component {
  
  state = { filterBy: 'recent', reverse: true };
  
  onClick = (filterBy) =>
    (typeof filterBy === 'string')
      ? this.setState({ filterBy: filterBy, reverse: true })
      : this.setState({ reverse: !this.state.reverse });
  
  render() {
    return (
      <table className='table table-hover table-responsive'>
        <THead onClick={this.onClick} {...this.state} />
        <TBody users={reverse(this.state.reverse, this.props.users.sort((a,b) =>
          mySort({a, b, key: this.state.filterBy})))}/>
      </table>
    );
  }
}

class App extends React.Component {
  
  static defaultProps = {url: `http://fcctop100.herokuapp.com/api/fccusers/top/recent`};
   
  state = { users: [] };
  
  componentDidMount() {
    fetch(this.props.url, { mode: 'cors' })
      .then(res => res.json())
      .then(res => this.setState({ users: res }))
  }
  
  render () {
    return (
        <Table {...this.state} />
    );
  } 
}

React.render(<App />, document.getElementById('root'));

        
               
               
                                                 
