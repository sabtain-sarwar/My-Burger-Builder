import React , { Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent , axios) => {
    return class extends Component {

        state = {
            error : null
        };

        // componentDidMount not working
        componentWillMount () {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error : null});
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res , error => {
                this.setState({error : error});
            });
            console.log('called 1');
        }

        componentWillUnmount () {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject({resInterceptor});
        }

        errorConfirmedHandler = () => {
            this.setState({error  :null});
        };

        render () {
            return (
                <Auxiliary>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler} >
                        {/* the state error message will throw an error initially bcz the modal component is always present even if we 
                        don't show(attribute) it. And so we i will add a ternary expression */}
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxiliary>
            );
        };
    }
};

export default withErrorHandler;