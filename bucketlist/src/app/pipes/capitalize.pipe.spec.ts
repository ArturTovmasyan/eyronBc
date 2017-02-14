import { async, inject, TestBed } from '@angular/core/testing';
import { CapitalizePipe } from './capitalize.pipe';

fdescribe('Pipe: CapitalisePipe', () => {
    let pipe;

    //setup
    beforeEach(async(() => {

            TestBed.configureTestingModule({
                providers: [ CapitalizePipe ]
            })
                .compileComponents();
        }
    ));

    beforeEach(inject([CapitalizePipe], p => {
        pipe = p;
    }));

    it('should work with empty string', () => {
        expect(pipe.transform('')).toEqual('');
    });

    it('should capitalise', () => {
        expect(pipe.transform('test')).toEqual('Test');
    });

});