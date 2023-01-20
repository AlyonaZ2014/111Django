import React from 'react'
import {Link} from 'react-router-dom'


const AuthorItem = ({item}) => {
    return (
        <tr>
            <td><Link to={`author/${item.id}`}>{item.id}</Link></td>
            <td>{item.name}</td>
            <td>{item.birthday_year}</td>
        </tr>
    )
}

const AuthorList = ({items}) => {
    return (
        <table>
            <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>BIRTHDAY_YEAR</th>
            </tr>
            {items.map((item) => <AuthorItem item={item} />)}
        </table>
    )
}
export default AuthorList
// import React from 'react'

// const AuthorItem = ({author}) => {
//     return (
//         <tr>
//             <td>
//                 {author.first_name}
//             </td>
//             <td>
//                 {author.last_name}
//             </td>
//             <td>
//                 {author.birthday_year}
//             </td>
//         </tr>
//     )
// }

// const AuthorList = ({authors}) => {
//     return (
//         <table>
//             <th>
//                 First name
//             </th>
//             <th>
//                 Last Name
//             </th>
//             <th>
//                 Birthday year
//             </th>
//             {authors.map((author) => <AuthorItem author={author} />)}
//         </table>
//     )
// }
// export default AuthorList