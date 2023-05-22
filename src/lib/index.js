import { useState, useEffect, useRef } from "react"
import "./css/DataTable.css"

/**
 * React component for represents a data table.
 *
 * @component
 * @param {Array} props.data - An array of objects representing the data to be displayed in the table.
 * @returns {JSX.Element} DataTable component
 */

function DataTable(props) {
    const data = props.data
    const [sortedData, setSortedData] = useState(data)
    const [ascendent, setAscendent] = useState(true)
    const [unFound, setUnFound] = useState(false)
    const sortData = (filterId) => {
        const tableList = document.querySelectorAll('th')
        switch(filterId) {
            case filterId :
                if(ascendent){
                    setSortedData([...sortedData].sort((a, b) => {return a[filterId].localeCompare(b[filterId])}))
                    tableList.forEach((table) => {
                        let chevronUp = table.children[0].children[0].children[0]
                        let chevronDown = table.children[0].children[0].children[1]
                        if (table.id === filterId){
                            chevronUp.classList.remove('unsorted')
                            chevronDown.classList.add('unsorted')
                        }else{
                            chevronUp.classList.add('unsorted')
                            chevronDown.classList.add('unsorted')
                        }
                    })    
                    setAscendent(false) 
                }else{
                    setSortedData([...sortedData].sort((a, b) => {return b[filterId].localeCompare(a[filterId])}))
                    tableList.forEach((table) => {
                        let chevronUp = table.children[0].children[0].children[0]
                        let chevronDown = table.children[0].children[0].children[1]
                        if (table.id === filterId){
                            chevronDown.classList.remove('unsorted')
                            chevronUp.classList.add('unsorted')
                        }else{
                            chevronDown.classList.add('unsorted')
                            chevronUp.classList.add('unsorted')
                        }
                    })   
                    setAscendent(true) 
                }
            break;
            default :
            return sortedData
        }
    }
    const [entry, setEntry] = useState(10)
    const [firstEntry, setFirstEntry] = useState(1)
    const [maxEntries, setMaxEntries] = useState(entry)

    const handleChange = (e) => {
        setEntry(JSON.parse(e.target.value))
    }
    let currentPage = useRef(1)
    const handlePrevNext = (e) => {
        const handleButton = e.target
        switch(handleButton.id){
            case 'next-btn': 
                if(currentPage.current < pages.length){
                    currentPage.current++
                    if(entry * currentPage.current <= sortedData.length){
                        setFirstEntry(maxEntries + 1)
                        setMaxEntries(entry * currentPage.current)
                    }else{
                        setFirstEntry(((currentPage.current * entry) - entry + 1))
                        setMaxEntries(sortedData.length)
                    }
                }
            break;
            case 'prev-btn':
                if(currentPage.current > 1){
                    currentPage.current--
                    setFirstEntry(firstEntry - entry)
                    setMaxEntries(currentPage.current * entry)
                }
            break;
            default:
                return console.log('no action')
        }
    }

    const searchEmployee = (e) => {
        let value = e.target.value
        let result = []
        if(data !== null){
            if(data.length > 0){
                data.filter((employee) => {
                    const EmployeeList = JSON.stringify(Object.values(employee))
                    if(EmployeeList.toLowerCase().includes(value.toLowerCase())) {
                        result.push(employee)
                    }if(result.length < 1){
                        setUnFound(true)
                    }else{
                        setUnFound(false)
                    }
                    return setSortedData(result)
                })
            }
        }
    }
    
    let pages = []
    if(data !== null){
        const NumberOfPages = Math.ceil(sortedData.length/entry)
        for(let i = 1; i <= NumberOfPages; i++){
            pages.push(i)
        }
    }
    const selectPage = (e) => {
        const page = JSON.parse(e.target.innerText)
        currentPage.current = page
        if(pages.length > 1){
            if(page === 1){
            setFirstEntry(1)
            setMaxEntries(entry)
        }else if(sortedData.length <= entry * page) {
            setMaxEntries(sortedData.length)
        }else{
            setMaxEntries(entry * page)
        }
        setFirstEntry(((page * entry) - entry + 1))
        }
    }
    useEffect(() => {
        if(data !== null){
            if(pages.length < 1){
                currentPage.current = 0
            }else{
                currentPage.current = 1
            }
            if(sortedData.length >= entry){
                setMaxEntries(entry)
            }else{
                setMaxEntries(sortedData.length)
            }if(unFound){
                setFirstEntry(0)
                setMaxEntries(0)
            }else{
                setFirstEntry(1)
            }
        }
    },[data, entry, pages.length, sortedData, unFound])
    useEffect(() => {
        if(data !== null){
            if(data.length > 0){
                if(currentPage.current === 0){
                    document.getElementById('prev-btn').style.background = 'none'
                    document.getElementById('next-btn').style.background = 'none'
                }else if(firstEntry === 1) {
                    document.getElementById('prev-btn').style.background = 'none'
                }else{
                    document.getElementById('prev-btn').style.background = '#687e12'
                }if(maxEntries === sortedData.length){
                    document.getElementById('next-btn').style.background = 'none'
                }else{
                    document.getElementById('next-btn').style.background = '#687e12'
                }
            }
        }  
    },[currentPage, data, firstEntry, maxEntries, sortedData])
    return(
        <div id="employee-div" className="container">
            <div className="table-header">
                <div className="entries">
                Show
                <select onChange={handleChange}>
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                    <option>100</option>
                </select>
                Entries
                </div>
                <div className="search-container">
                    <label htmlFor="searchbar">Search:</label>
                    <input onKeyUp={searchEmployee} type="text" id="searchbar" name="searchbar"/>
                </div>
            </div>
            {data !== null && data.length > 0 ? (<table>
                <thead>
                    <tr>
                    {
                        Object.keys(data[0]).map((key, index) => <th id={key} onClick={() => sortData(key)} key={key + index}>
                            <div id={key} className="data-title">
                                {key.replace(/([A-Z])/g, ' $1')
                                .replace(/^./, function(str){ return str.toUpperCase()})}
                                <span className="chevrons">
                                    <i id='chevron-up' onClick={() => sortData(key)} className="fa-solid fa-caret-up unsorted"></i>
                                    <i id="chevron-down" onClick={() => sortData(key)} className="fa-solid fa-caret-down unsorted"></i>
                                </span>
                            </div>
                        </th>)
                    }
                    </tr>
                </thead>
                {
                    !unFound ? (<tbody className='data-table'>
                        {
                            sortedData.map((obj, index) => <tr key={index}>
                            {index + 1 >= firstEntry && index < maxEntries && Object.values(obj).map((key, index) => <td key={key + index}>{key}</td>)}
                        </tr>)
                        }
                    </tbody>) : <tbody><tr><td colSpan='10' className="empty-list">No Data Found</td></tr></tbody>
                }
                <tfoot>
                    <tr> 
                        <td colSpan={JSON.stringify(Object.keys(data[0]).length - 2)}>Showing {firstEntry} To {maxEntries} Of {sortedData.length} Entries {sortedData.length < data.length && ' (filtered from ' + data.length + ' total entries)'}</td>
                        <td>
                            <button id='prev-btn' onClick={handlePrevNext}>Preview</button>
                        </td>
                        <td className="pages">
                            {data !== null && pages.map(page => {return <div className='page-number' onClick={selectPage} key={page}>{(page)}</div>})}
                        </td>
                        <td>
                            <button id='next-btn' onClick={handlePrevNext}>Next</button>
                        </td>
                    </tr>
                </tfoot>
            </table>) : <div className="empty-list">There's no Data</div>}
        </div>
    )
}

export default DataTable