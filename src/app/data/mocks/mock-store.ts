import { of } from "rxjs";

class MockStore {
    select() {
      return of([
        { id: 1, name: "Store 1" },       

      ]); 
    }
  
    dispatch() {
      return of({
        
      }); 
    }
  }