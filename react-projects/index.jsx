const mySort = ({ a, b, filter}) => {
  if (typeof a[filter] === 'number') {
    return a[filter] - b[filter];
  }
  return a[filter] > b[filter] ? 1 : -1;
}

const reverse = (flag, arr) =>
  flag ? arr.reverse() : arr;

const TRow = ({ index, img, username, recent, alltime }) => (
  <tr>
    <td>{index}</td>
    <td>
      <a className='avatar' href={'http://www.freecodecamp.com/' + username} target='_blank'>
        <img src={img} />
        <span>{username}</span>
      </a>
    </td>
    <td>{recent}</td>
    <td>{alltime}</td>
  </tr>
);


const FilterLink = ({filterBy, children, filter, onClick, reverse}) => {
  return (
    (filterBy === filter)
      ? <a href='#' onClick={onClick}>{children}{' '}{reverse ? '▼' : '▲'}</a>
      : <span onClick={() => onClick(filter)}>{children}</span>
);
}

const THead = (props) => {
  return (
  <thead>
    <tr>
      <th colSpan='4'>
        <a href='http://www.freecodecamp.com/'>
          <img src='https://s3.amazonaws.com/freecodecamp/freecodecamp_logo.svg' />
        </a>
      </th>
    </tr>
    <tr>
      <th>#</th>
      <th><FilterLink filter='username' {...props}>users</FilterLink></th>
      <th><FilterLink filter='recent' {...props}>last 30 days</FilterLink></th>
      <th><FilterLink filter='alltime' {...props}>All time</FilterLink></th>
    </tr>
  </thead>
);
                         }

const TBody = ({ users }) => {
  return (
  <tbody>
    {users.map((user, index) =>
      <TRow {...user} index={index + 1} />)}
  </tbody>
);
                             }

class Table extends React.Component {
  
  state = { filterBy: 'recent', reverse: true };
  
  onClick = (filterBy) => {
    (typeof filterBy === 'string')
      ? this.setState({ filterBy: filterBy, reverse: true })
      : this.setState({ reverse: !this.state.reverse })
  }
  
  render() {
    console.log(this.props.users)
    return (
      <table>
        <THead onClick={this.onClick} {...this.state} />
        <TBody users={reverse(this.state.reverse, this.props.users.sort((a,b) =>
          mySort({a, b, filter: this.state.filterBy})))}
        />
      </table>
    );
  }
}

class App extends React.Component {
  
  static defaultProps = {
    url: `http://fcctop100.herokuapp.com/api/fccusers/top/recent`
  }
    
  static propTypes = {
    url: React.PropTypes.string.isRequired
  }
  
  state = { users: [] }
  
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

        
               
               
                                                 
