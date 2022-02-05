import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import FolderIcon from '@mui/icons-material/Folder'
import Chip from '@mui/material/Chip'
import { keywordList } from '../mockdata/mainPage'

function MainScreen() {
    const [input, setInput] = useState<string>('')
    const [keywords, setKeywords] = useState<string[]>(keywordList)
    const [selectedKeywords, setSelectedKeywords] = useState<string[]>([])

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value)
    }
    const sendInput = () => {
        console.log('input', input)
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
    }
    return (
        <div>
            <Card variant="outlined" sx={{ minWidth: 275 }}>
                <TextField
                    id="user-input"
                    onChange={handleInput}
                />
                <Button variant="contained" onClick={sendInput}>ตรวจจับคีย์เวิร์ด</Button>
            </Card>
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
            <Card>

            </Card>
        </div>
    );
}

export default MainScreen;