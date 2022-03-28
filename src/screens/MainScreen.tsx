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

function MainScreen() {
    const [inputSymptoms, setInputSymtoms] = useState<string>('')
    const [keywords, setKeywords] = useState<string[]>([])
    const [selectedKeywords, setSelectedKeywords] = useState<string[]>([])
    const [diagnosisResult, setDiagnosisResult] = useState(diagnosisList)

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
                            placeholder='กรุณาใส่ข้อความระบุอาการผู้ป่วย..'
                            sx={{
                                width: 1,
                                marginBottom: '8px',
                            }}
                        />
                        <Button
                            variant="contained"
                            onClick={getKeywords}
                            sx={{
                                width: '162.72px'
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
                                <TableRow>
                                    <TableCell align="right">โรค</TableCell>
                                    <TableCell align="right">ความเป็นไปได้</TableCell>
                                    <TableCell align="right">คีย์เวิร์ด</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {diagnosisResult.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{row.diagnosis}</TableCell>
                                        <TableCell>{row.probability}</TableCell>
                                        <TableCell>
                                            {Object.keys(row.keyword).map(key => (
                                                <TableRow>
                                                    {row.keyword[key]}
                                                </TableRow>
                                            ))}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Card>
            </div>
        </div >
    );
}

export default MainScreen