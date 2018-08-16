import React from 'react'
import { mount, render } from 'enzyme'
import { spy, stub } from 'sinon'
import { onDocumentDragOver } from './utils'

import Dropzone from './index'; // eslint-disable-line import/no-dynamic-require
const DummyChildComponent = () => null

let files
let images

const rejectColor = 'red'
const acceptColor = 'green'

const rejectStyle = {
  color: rejectColor,
  borderColor: 'black'
}

const acceptStyle = {
  color: acceptColor,
  borderWidth: '5px'
}

describe('Dropzone', () => {
  beforeEach(() => {
    files = [
      {
        name: 'file1.pdf',
        size: 1111,
        type: 'application/pdf'
      }
    ]

    images = [
      {
        name: 'cats.gif',
        size: 1234,
        type: 'image/gif'
      },
      {
        name: 'dogs.jpg',
        size: 2345,
        type: 'image/jpeg'
      }
    ]
  })
   //BASIC RENDERING
  describe('basics', () => {
    it('should render children', () => {
      const dropzone = mount(
        <Dropzone>
          <p>some content</p>
        </Dropzone>
      )
      expect(dropzone.html()).toMatchSnapshot()
    })

    it('should render an input HTML element', () => {
      const dropzone = mount(
        <Dropzone disablePreview>
          <p>some content</p>
        </Dropzone>
      )
      expect(dropzone.find('input').length).toEqual(1)
    })


    it('should render children function', () => {
        const content = <p>some content</p>
        const dropzone = mount(<Dropzone>{content}</Dropzone>)
        const dropzoneWithFunction = mount(<Dropzone>{() => content}</Dropzone>)
        expect(dropzoneWithFunction.html()).toEqual(dropzone.html())
      })

      it('sets ref properly', () => {
        const dropzone = mount(<Dropzone />)
        expect(dropzone.instance().fileInputEl).not.toBeUndefined()
        expect(dropzone.instance().fileInputEl.tagName).toEqual('INPUT')
      })
    })
     //DRAG AND DROP BEHAVIOR
    describe('drag-n-drop', () => {
        it('should override onDrag* methods', () => {
          const dragStartSpy = spy()
          const dragEnterSpy = spy()
          const dragOverSpy = spy()
          const dragLeaveSpy = spy()
          const component = mount(
            <Dropzone
            disablePreview
              onDragStart={dragStartSpy}
              onDragEnter={dragEnterSpy}
              onDragOver={dragOverSpy}
              onDragLeave={dragLeaveSpy}
            />
          )
          component.simulate('dragStart')
          component.simulate('dragEnter', { dataTransfer: { items: files } })
          component.simulate('dragOver', { dataTransfer: { items: files } })
          component.simulate('dragLeave', { dataTransfer: { items: files } })
          expect(dragStartSpy.callCount).toEqual(1)
          expect(dragEnterSpy.callCount).toEqual(1)
          expect(dragOverSpy.callCount).toEqual(1)
          expect(dragLeaveSpy.callCount).toEqual(1)
        })


        it('should keep dragging active when leaving from arbitrary node', async () => {
            const arbitraryOverlay = mount(<div />)
            const dropzone = mount(<Dropzone disablePreview>{props => <DummyChildComponent {...props} />}</Dropzone>)
            await dropzone.simulate('dragEnter', { dataTransfer: { files: images } })
            dropzone.simulate('dragLeave', { target: arbitraryOverlay })
            expect(dropzone.state('isDragActive')).toBe(true)
            expect(dropzone.state('draggedFiles').length > 0).toBe(true)
          })

          it('should expose state to children', async () => {
            const dropzone = mount(
              <Dropzone disablePreview accept="image/*">
                {({ isDragActive, isDragAccept, isDragReject }) => {
                  if (isDragReject) {
                    return `${isDragActive && 'Active but'} Reject`
                  }
                  if (isDragAccept) {
                    return `${isDragActive && 'Active and'} Accept`
                  }
                  return 'Empty'
                }}
              </Dropzone>
            )
            expect(dropzone.text()).toEqual('Empty')
            await dropzone.simulate('dragEnter', { dataTransfer: { files: images } })
            expect(dropzone.text()).toEqual('Active and Accept')
            await dropzone.simulate('dragEnter', { dataTransfer: { files } })
            expect(dropzone.text()).toEqual('Active but Reject')
          })
    })


  describe('onDrop', () => {
    let dropSpy
    let dropAcceptedSpy
    let dropRejectedSpy

    beforeEach(() => {
      dropSpy = spy()
      dropAcceptedSpy = spy()
      dropRejectedSpy = spy()
    })

    afterEach(() => {
      dropSpy.resetHistory()
      dropAcceptedSpy.resetHistory()
      dropRejectedSpy.resetHistory()
    })

    it('should add valid files to rejected files on a multple drop when multiple false', async () => {
        const dropzone = mount(<Dropzone disablePreview getMousePosition={()=>''} accept="image/*" onDrop={dropSpy} multiple={false} />)
        await dropzone.simulate('drop', { dataTransfer: { files: images } })
        const rejected = dropSpy.firstCall.args[0]
        expect(rejected.length).toEqual(1)
      })

      it('should allow single files to be dropped if multiple is false', async () => {
        const dropzone = mount(<Dropzone  disablePreview getMousePosition={()=>''} accept="image/*" onDrop={dropSpy} multiple={false} />)
  
        await dropzone.simulate('drop', { dataTransfer: { files: [images[0]] } })
        const [accepted, rejected] = dropSpy.firstCall.args
        expect(accepted.length).toEqual(1)
        expect(rejected.length).toEqual(0)
      })

      it('should take all dropped files if multiple is true', async () => {
        const dropzone = mount(<Dropzone disablePreview getMousePosition={()=>''}  onDrop={dropSpy} multiple />)
        await dropzone.simulate('drop', { dataTransfer: { files: images } })
        expect(dropSpy.firstCall.args[0]).toHaveLength(2)
        expect(dropSpy.firstCall.args[0][0].name).toEqual(images[0].name)
        expect(dropSpy.firstCall.args[0][1].name).toEqual(images[1].name)
      })

      it('should call onDropAccepted callback if some files were accepted', async () => {
        const dropzone = mount(
          <Dropzone
          disablePreview
            onDrop={dropSpy}
            getMousePosition={()=>''}
            onDropAccepted={dropAcceptedSpy}
            onDropRejected={dropRejectedSpy}
            accept="image/*"
          />
        )
        await dropzone.simulate('drop', { dataTransfer: { files } })
        expect(dropAcceptedSpy.callCount).toEqual(0)
        await dropzone.simulate('drop', { dataTransfer: { files: images } })
        expect(dropAcceptedSpy.callCount).toEqual(1)
        expect(dropAcceptedSpy.lastCall.args[0]).toEqual([...images])
        await dropzone.simulate('drop', {
          dataTransfer: { files: files.concat(images) }
        })
        expect(dropAcceptedSpy.callCount).toEqual(2)
        expect(dropAcceptedSpy.lastCall.args[0]).toEqual([...images])
      })

      it('accepts a dropped image when Firefox provides a bogus file type', async () => {
        const dropzone = mount(
          <Dropzone
          disablePreview
            getMousePosition={()=>''}
            onDrop={dropSpy}
            onDropAccepted={dropAcceptedSpy}
            onDropRejected={dropRejectedSpy}
            accept="image/*"
          />
        )
        const bogusImages = [
          {
            name: 'bogus.gif',
            size: 1234,
            type: 'application/x-moz-file'
          }
        ]
  
        await dropzone.simulate('drop', { dataTransfer: { files: bogusImages } })
        expect(dropSpy.callCount).toEqual(1)
        expect(dropSpy.firstCall.args[0]).toHaveLength(1)
        expect(dropSpy.firstCall.args[1]).toHaveLength(0)
        expect(dropAcceptedSpy.callCount).toEqual(1)
        expect(dropAcceptedSpy.firstCall.args[0]).toHaveLength(1)
        expect(dropRejectedSpy.callCount).toEqual(0)
      })

      it('accepts all dropped files and images when no accept prop is specified', async () => {
        const dropzone = mount(
          <Dropzone
          disablePreview
             getMousePosition={()=>''}
            onDrop={dropSpy}
            onDropAccepted={dropAcceptedSpy}
            onDropRejected={dropRejectedSpy}
          />
        )
        await dropzone.simulate('drop', {
          dataTransfer: { files: files.concat(images) }
        })
        expect(dropSpy.callCount).toEqual(1)
        expect(dropSpy.firstCall.args[0]).toHaveLength(3)
        expect(dropSpy.firstCall.args[1]).toHaveLength(0)
        expect(dropAcceptedSpy.callCount).toEqual(1)
        expect(dropAcceptedSpy.firstCall.args[0]).toHaveLength(3)
        expect(dropRejectedSpy.callCount).toEqual(0)
      })
  
      it('applies the maxSize prop to the dropped files', async () => {
        const dropzone = mount(
          <Dropzone
            getMousePosition={()=>''}
            disablePreview
            onDrop={dropSpy}
            onDropAccepted={dropAcceptedSpy}
            onDropRejected={dropRejectedSpy}
            maxSize={1111}
          />
        )
  
        await dropzone.simulate('drop', { dataTransfer: { files } })
        expect(dropSpy.callCount).toEqual(1)
        expect(dropSpy.firstCall.args[0]).toHaveLength(1)
        expect(dropSpy.firstCall.args[1]).toHaveLength(0)
        expect(dropAcceptedSpy.callCount).toEqual(1)
        expect(dropAcceptedSpy.firstCall.args[0]).toHaveLength(1)
        expect(dropRejectedSpy.callCount).toEqual(0)
      })

      it('should not generate previews if disablePreview is true', async () => {
        const dropSpy = spy()
        const dropzone = mount(<Dropzone   getMousePosition={()=>''} disablePreview onDrop={dropSpy} />)
        await dropzone.simulate('drop', { dataTransfer: { files: images } })
        await dropzone.simulate('drop', { dataTransfer: { files } })
        expect(dropSpy.callCount).toEqual(2)
        expect(Object.keys(dropSpy.firstCall.args[0][0])).not.toContain('preview')
        expect(Object.keys(dropSpy.lastCall.args[0][0])).not.toContain('preview')
      })
    })
    describe('behavior', () => {
        it('does not throw an error when html is dropped instead of files and multiple is false', () => {
          const dropzone = mount(<Dropzone getMousePosition={()=>''} multiple={false} />)
    
          const fn = () => dropzone.simulate('drop', { dataTransfer: { files: [] } })
          expect(fn).not.toThrow()
        })
    
        it('does not allow actions when disabled props is true', done => {
          const dropzone = mount(<Dropzone disabled />)
    
          spy(dropzone.instance(), 'open')
          dropzone.simulate('click')
          setTimeout(() => {
            expect(dropzone.instance().open.callCount).toEqual(0)
            done()
          }, 0)
        })
    
        it('when toggle disabled props, Dropzone works as expected', done => {
          const dropzone = mount(<Dropzone disabled />)
          spy(dropzone.instance(), 'open')
          dropzone.setProps({ disabled: false })
          dropzone.simulate('click')
          setTimeout(() => {
            expect(dropzone.instance().open.callCount).toEqual(1)
            done()
          }, 0)
        })
      })

})