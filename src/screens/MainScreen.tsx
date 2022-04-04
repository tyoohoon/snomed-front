import React, { useState } from 'react'
import axios from 'axios';
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import FolderIcon from '@mui/icons-material/Folder'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { keywordList, diagnosisList } from '../mockdata/mainPage'
import { get_all_keywords, get_diagnosis_result } from '../services'
import Divider from '@mui/material/Divider';
import TablePagination from '@mui/material/TablePagination';
import Tooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

function MainScreen() {
    const [inputSymptoms, setInputSymtoms] = useState<string>('')
    const [keywords, setKeywords] = useState<string[]>([])
    const [selectedKeywords, setSelectedKeywords] = useState<string[]>([])
    const [diagnosisResult, setDiagnosisResult] = useState(diagnosisList)

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleInputSymtoms = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputSymtoms(event.target.value)
    }
    const getKeywords = () => {
        axios.get(get_all_keywords, {
            params: {
                symptoms: inputSymptoms
            }
        }).then(function (response) {
            console.log(response.data.keywords);
            setKeywords(response.data.keywords)
        }).catch(function (error) {
            console.log('error from send_symptoms');
        });
    }
    const handleKeywordListItemClick = (index: number) => {
        setSelectedKeywords([...selectedKeywords, keywords[index]])
        keywords.splice(index, 1)
    }
    const handleUnselectKeyword = (index: number) => {
        setKeywords([...keywords, selectedKeywords[index]])
        selectedKeywords.splice(index, 1)
    }
    const sendSelectedKeyword = () => {
        console.log('selectedKeywords', selectedKeywords)

        axios.get(get_diagnosis_result, {
            params: {
                selected_keywords: selectedKeywords
            }
        }).then(function (response) {
            console.log(response)
            setDiagnosisResult(response.data.diagnosis_result)
        }).catch(function (error) {
            console.log('error from send_selected_keywords');
        });
    }
    return (
        <div className='mainscreen-container'>
            <div>
                <p className='section-title'>แบบฟอร์มการวินิจฉัยแยกโรคเบื้องต้นสำหรับบุคคลทั่วไป</p>
                <Card variant="outlined" sx={{ minWidth: 275, marginBottom: '41px' }}>
                    <div className='input-card'>
                        <p style={{ alignSelf: 'flex-start' }}>ขั้นตอนที่ 1: ใส่ข้อความระบุอาการผู้ป่วย</p>
                        <TextField
                            id="user-input"
                            onChange={handleInputSymtoms}
                            // placeholder='กรุณาใส่ข้อความระบุอาการผู้ป่วย..'
                            label='กรุณาใส่ข้อความระบุอาการผู้ป่วย..'
                            sx={{
                                width: 1,
                                marginBottom: '8px',
                            }}
                        />
                        <Button
                            variant="contained"
                            onClick={getKeywords}
                            sx={{
                                width: '162.72px',
                                background: 'rgba(196, 196, 196, 0.7)',
                                borderRadius: '4px'
                            }}
                        >ตรวจจับคีย์เวิร์ด</Button>
                    </div>
                </Card>
                <Card className='space-between' sx={{ minWidth: 275, marginBottom: '41px' }}>
                    <div className='input-card'>
                        <p>ขั้นตอนที่ 2: เลือกอาการที่ต้องการนำไปวินิจฉัย</p>
                        <Card>
                            <p>คีย์เวิร์ด</p>
                            <List>
                                {
                                    keywords.map((keyword, index) => {
                                        return (
                                            <ListItem key={index}>
                                                <ListItemIcon
                                                    onClick={() => handleKeywordListItemClick(index)}
                                                >
                                                    <FolderIcon />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={keyword}
                                                />
                                            </ListItem>
                                        )
                                    })
                                }
                            </List>
                        </Card>
                    </div>
                    <div className='input-card'>
                        <p>ขั้นตอนที่ 3: กดปุ่ม “วินิจฉัย” เพื่อวินิจฉัยแยกโรคตามอาการ</p>
                        <Card>
                            <p>คีย์เวิร์ด</p>
                            {
                                selectedKeywords.map((keyword, index) => {
                                    return (
                                        <Chip key={index} label={keyword} onDelete={() => handleUnselectKeyword(index)} />
                                    )
                                })
                            }
                            <Button variant="contained" onClick={sendSelectedKeyword}>วินิจฉัย</Button>
                        </Card>
                    </div>
                </Card>


                <p className='section-title'>ตารางการวินิจฉัยแยกโรค</p>
                <Card>
                    <TableContainer>
                        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                            <TableHead>
                                <TableRow style={{ backgroundColor: '#ABC4FF' }}>
                                    {['โรค', 'ความเป็นไปได้', 'คีย์เวิร์ด'].map(label =>
                                        <TableCell
                                            align="center"
                                            style={{ color: 'white' }}
                                        >
                                            {label}
                                        </TableCell>
                                    )}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {diagnosisResult.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell style={{ borderWidth: 1, borderColor: '#C6CACC', borderStyle: 'solid' }}>{row.diagnosis}</TableCell>
                                        <TableCell style={{ borderWidth: 1, borderColor: '#C6CACC', borderStyle: 'solid' }}>{row.probability}</TableCell>
                                        <TableCell style={{ borderWidth: 1, borderColor: '#C6CACC', borderStyle: 'solid', padding: 0 }}>
                                            {Object.keys(row.keyword).map((key, index) => (
                                                <div style={{ width: '100%' }}>
                                                    {console.log('row.keyword[key]', row.keyword[key])}
                                                    {index !== 0 && <Divider />}
                                                    <div style={{ padding: '8px' }}>
                                                        <span >{key}: </span>
                                                        {
                                                            row.keyword[key].map((keyword: string, i: number) => {
                                                                return (
                                                                    <>
                                                                        {index === 2 && i === 0 && <Tooltip title="อาการที่พบในโรคนี้ แต่ไม่พบในตัวกรอง" placement="top">
                                                                            <InfoOutlinedIcon />
                                                                        </Tooltip>}
                                                                        <Chip key={i} label={keyword} variant="outlined" sx={{
                                                                            borderColor: 'black',
                                                                            borderRadius: '7px',
                                                                            marginRight: '7px',
                                                                            marginBottom: '7px',
                                                                            height: '31px',
                                                                        }} />
                                                                    </>

                                                                )
                                                            })
                                                        }
                                                    </div>

                                                </div>
                                            ))}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={diagnosisResult.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Card>
            </div>
        </div >
    );
}

export default MainScreen