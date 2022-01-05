import React from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';

function UserTable(props) {
    const users = props.users;

    if (users === undefined) {
        users = false;
    }


    return (
        <Table hover responsive>
            <thead>
                <tr>
                    <th>User Name</th>
                    <th>Administrator</th>
                    <th>Löschung beantragt </th>
                    <th>Bearbeiten</th>
                    <th>Löschen</th>
                </tr>
            </thead>
            <tbody>
                {(!users) ? "NO ENTRY !" : users.map(users => (
                    <tr>
                        <td>{users.userName}</td>
                        <td>{users.isAdministrator ? "Ja" : "Nein"}</td>
                        <td>{users.deletedFlag ? "Ja" : "Nein"}</td>
                        <td><Button>Bearbeiten</Button></td>
                        <td><Link to="#" data-value={users.userID} className="btn btn-primary">Löschen</Link></td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )

}

export default UserTable