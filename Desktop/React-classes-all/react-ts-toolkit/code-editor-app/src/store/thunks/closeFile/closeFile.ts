import { Dispatch } from 'redux'
import { removeActiveFile, setEditorAciveFile } from '../../reducers/files/reducer'
import { RootState } from '../../store'

const getNewActiveFile = (activeFileIds: string[], activeFilesLength: number, fileId: string) => {
	const fileToBeRemovedIndex = activeFileIds.indexOf(fileId)
	if (fileToBeRemovedIndex + 1 === activeFilesLength) {
		return activeFileIds[fileToBeRemovedIndex - 1]
	}
	return activeFileIds[fileToBeRemovedIndex + 1]
}

const closeFile = (fileId: string) => (dispatch: Dispatch, getState: () => RootState) => {
	const state = getState()
	const { activeFiles, editorActiveFile } = state.files
	const activeFilesLength = activeFiles.length
	if (activeFilesLength >= 2) {
		const newActiveFileId = getNewActiveFile(activeFiles, activeFilesLength, fileId)
		if (editorActiveFile === fileId || editorActiveFile === newActiveFileId) {
			dispatch(setEditorAciveFile(newActiveFileId))
		}
	} else {
		dispatch(setEditorAciveFile(null))
	}
	dispatch(removeActiveFile(fileId))
}

export default closeFile
