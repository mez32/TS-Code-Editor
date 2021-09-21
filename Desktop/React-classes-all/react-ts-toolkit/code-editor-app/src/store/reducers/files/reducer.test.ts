import { PayloadAction } from '@reduxjs/toolkit'
import filesReducer, {
	addActiveFile,
	initialState,
	removeActiveFile,
	setEditorAciveFile,
	setFiles,
	updateFileCode,
} from './reducer'

describe('files reducer', () => {
	test('should return initial state if no known action is provided', () => {
		expect(filesReducer(undefined, {} as PayloadAction)).toEqual(initialState)
	})
	test('should set user files when action is setFiles', () => {
		const userFiles = [
			{
				id: '1',
				name: 'index.js',
				relativePath: 'test/index.js',
				code: 'console.log("hello world")',
				extension: 'js',
			},
		]
		const expectedState = {
			...initialState,
			activeFiles: [],
			userFiles,
		}
		expect(filesReducer(initialState, setFiles(userFiles))).toEqual(expectedState)
	})
	test('should add a new file id when action is addActiveFile', () => {
		const fileId = '2'
		const expectedState = {
			...initialState,
			activeFiles: [fileId],
		}
		expect(filesReducer(initialState, addActiveFile(fileId))).toEqual(expectedState)
	})
	test('should remove a file id when action is removeFile', () => {
		const fileId = '2'
		const modifiedInitialState = {
			...initialState,
			activeFiles: [fileId],
		}
		const expectedState = {
			...initialState,
			activeFiles: [],
		}
		expect(filesReducer(modifiedInitialState, removeActiveFile(fileId))).toEqual(expectedState)
	})
	test('should update the code when action is updateFileCode', () => {
		const payload = {
			fileId: '3',
			newCode: 'print("hello world")',
		}
		const modifiedInitialState = {
			...initialState,
			userFiles: [
				{
					id: '3',
					code: 'console.log("Hello world")',
					name: 'index.js',
					relativePath: 'tests/files.js',
					index: 'js',
				},
			],
		}
		const expectedState = {
			...initialState,
			userFiles: [
				{
					id: '3',
					code: 'print("hello world")',
					name: 'index.js',
					relativePath: 'tests/files.js',
					index: 'js',
				},
			],
		}
		expect(filesReducer(modifiedInitialState, updateFileCode(payload))).toEqual(expectedState)
	})
	test('should not update the state when updateFileCode reducer does not find a file', () => {
		const payload = {
			fileId: '1',
			newCode: 'print("hello world")',
		}
		const modifiedInitialState = {
			...initialState,
			userFiles: [
				{
					id: '3',
					code: 'console.log("Hello world")',
					name: 'index.js',
					relativePath: 'tests/files.js',
					index: 'js',
				},
			],
		}
		const expectedState = modifiedInitialState
		expect(filesReducer(modifiedInitialState, updateFileCode(payload))).toEqual(expectedState)
	})
	test("should set the editor's active file when action is setEditorsActiveFile", () => {
		const fileId = '1'
		const expectedState = {
			...initialState,
			editorActiveFile: '1',
		}
		expect(filesReducer(initialState, setEditorAciveFile(fileId))).toEqual(expectedState)
	})
})
