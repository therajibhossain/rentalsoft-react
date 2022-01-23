import React, { Component } from "react";
import ProductDataService from "../services/product.service";

import Table from "./Table";
import ReactModal from "react-modal";
import ConfirmModal from "./ConfirmModal";

import Select from 'react-select';

import DateRangePicker from 'react-bootstrap-daterangepicker';
// you will need the css that comes with bootstrap@3. if you are using
// a tool like webpack, you can do the following:
import 'bootstrap/dist/css/bootstrap.css';
// you will also need the css that comes with bootstrap-daterangepicker
import 'bootstrap-daterangepicker/daterangepicker.css';

export default class ProductsList extends Component {
    constructor(props) {
        super(props);

        this.retriveProducts = this.retriveProducts.bind(this);
        this.refreshList = this.refreshList.bind(this);

        this.handleOpenBookModal = this.handleOpenBookModal.bind(this);
        this.handleCloseBookModal = this.handleCloseBookModal.bind(this);

        this.handleOpenReturnModal = this.handleOpenReturnModal.bind(this);
        this.handleCloseReturnModal = this.handleCloseReturnModal.bind(this);
        
        this.handleOpenConfirmModal = this.handleOpenConfirmModal.bind(this);
        this.handleCloseConfirmModal = this.handleCloseConfirmModal.bind(this);

        this.handleProductChange = this.handleProductChange.bind(this);
        this.handleEventDateRange = this.handleEventDateRange.bind(this);
        this.handleCallbackDateRange = this.handleCallbackDateRange.bind(this);
        this.handleChangeUsedMileage = this.handleChangeUsedMileage.bind(this);

        this.state = {
            products: [],
            showBookModal: false,
            showReturnModal: false,
            showConfirmModal: false,
            selectedOption: null,
            selectionRange: 0,            
            estimatedPrice: 0,
            totalPrice: 0,
            usedMileage: "",
        }
    }
    
    componentDidMount() {
        this.retriveProducts();        
    }

    retriveProducts() {
        ProductDataService.getAll()
            .then(response => { 
                this.setState({products: response.data.data});
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retriveProducts();
    }

    handleOpenBookModal() {
        this.setState({showBookModal: true});
    }
    handleCloseBookModal() {
        this.setState({showBookModal: false});
    }

    handleOpenReturnModal() {
        this.setState({showReturnModal: true});
    }
    handleCloseReturnModal() {
        this.setState({showReturnModal: false});
    }

    handleOpenConfirmModal(modalType) {
        const {selectedOption, selectionRange, usedMileage} = this.state;
        const {price, type} = selectedOption; 

        if(modalType === 'book') {
            let estimatedPrice = 0;
            if(type === 'plain') {
                estimatedPrice = price * selectionRange;
            }else if(type ==='meter'){
                estimatedPrice = (selectionRange * 10) * price;
            }

            this.setState({estimatedPrice: estimatedPrice});
        }else {
            let totalPrice = 0;
            totalPrice = price - usedMileage;
            this.setState({totalPrice: totalPrice}); console.log(totalPrice)
        }
        console.log(selectedOption, usedMileage);

        
        this.setState({showConfirmModal: true});
    }
    handleCloseConfirmModal() {
        this.setState({showConfirmModal: false})
    }

    handleProductChange(selectedOption) {
        this.setState({ selectedOption: selectedOption });
    };

    handleEventDateRange(event, picker) {
        // console.log(picker.startDate);
    }
    handleCallbackDateRange(start, end, label) {
        const days = Math.floor((Math.abs(end-start))/(1000*60*60*24));
        this.setState({selectionRange: days});    
    }

    handleChangeUsedMileage(e) {
        this.setState({usedMileage: e.target.value})
    }

    render() {
        const {products, showBookModal, showReturnModal, showConfirmModal, selectedOption, estimatedPrice, totalPrice, usedMileage} = this.state;

        const productOptions = products.map((product, index) => {
            return {
                value: product.id, label: `${product.name} / ${product.code}`, 
                type: product.type,
                price: product.price,
                mileage: product.mileage, 
                minimum_rent_period: product.minimum_rent_period
            };
        });
            
        return (
            <>
                <div className="list row">

                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                        <h3 className="p-3 text-center">Products List</h3> 

                        <Table data={products} /> 

                        <div style={{'float': 'right'}}>
                            <button className="m-1 btn btn-sm btn-success"
                                onClick={this.handleOpenBookModal}>Book
                            </button>

                            <button className="m-1 btn btn-sm btn-danger" 
                                onClick={this.handleOpenReturnModal}>Return
                            </button>
                        </div>                

                    </div>                                    
                
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                        <ReactModal isOpen={showBookModal} ariaHideApp={false}>
                            <h3>Book a Product</h3>

                            <div>
                                <Select options={productOptions} value={selectedOption} onChange={this.handleProductChange} />
                            </div>

                            <div>
                                <DateRangePicker onEvent={this.handleEventDateRange} onCallback={this.handleCallbackDateRange}>
                                    <input type="text" className="form-control" />
                                </DateRangePicker>
                            </div>                            

                            <div style={{'float': 'right'}}>
                                <button onClick={this.handleCloseBookModal} className="m-1 btn btn-sm btn-danger">No</button>
                                <button onClick={() => this.handleOpenConfirmModal('book')} className="m-1 btn btn-sm btn-success">Yes</button>
                            </div>

                            <ConfirmModal isOpen={showConfirmModal} handleCloseModal={this.handleCloseConfirmModal}
                                modalTitle="Book a Product" priceTitle={`Your estimated price is $${estimatedPrice}`} 
                            />
                        </ReactModal>

                        <ReactModal isOpen={showReturnModal} ariaHideApp={false}>
                            <h3>Return a Product</h3>

                            <div>
                                <Select options={productOptions} value={selectedOption} onChange={this.handleProductChange} />
                            </div>

                            <div>
                                <input type="text" className="form-control" placeholder="Used Mileage" value={usedMileage} onChange={this.handleChangeUsedMileage} />
                            </div>                            

                            <div style={{'float': 'right'}}>
                                <button onClick={this.handleCloseReturnModal} className="m-1 btn btn-sm btn-danger">No</button>
                                <button onClick={() => this.handleOpenConfirmModal('return')} className="m-1 btn btn-sm btn-success">Yes</button>
                            </div>

                            <ConfirmModal isOpen={showConfirmModal} handleCloseModal={this.handleCloseConfirmModal}
                                modalTitle="Return a Product" priceTitle={`Your total price is $${totalPrice}`} 
                            />
                        </ReactModal>
                    </div>

                </div>
            </>
        );
    }
}