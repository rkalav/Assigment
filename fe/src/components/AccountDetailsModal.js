import React from 'react';
import { AccountDetails } from './AccountDetails';
export const AccountDetailsModel = ({ transectionHistory, isAccountDetails,onClose }) => {
    return (
        <div class="modal show d-block" style={{ background:'#0000008a'}}>
            <div class="modal-dialog" style={{maxWidth:'80vw'}}>
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Account Details</h4>
                    </div>
                    <div class="modal-body">
                        <div className='row'>
                            <div className="col-12 bg-white rounded">
                                {transectionHistory && transectionHistory.length ? (
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Amount</th>
                                                <th>Date</th>
                                                <th>Reward</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {transectionHistory.map((e, i) => (
                                                <AccountDetails key={i} {...e} />
                                            ))}
                                        </tbody>
                                    </table>
                                ) : null}
                                {!transectionHistory.length && isAccountDetails ? <div className="m-auto">No Data Found</div> : null}
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-info" onClick={onClose} data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}