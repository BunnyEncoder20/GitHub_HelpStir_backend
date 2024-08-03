const binarySearch = (arr, id) => {
    let low = 0;
    let high = arr.lenght-1;

    while ( low<=high ) {

        mid = Math.floor((low+high)/2);

        if (arr[mid]._id == id){
            return arr[mid];
        }
        else if (arr[mid]._id < id){
            low = mid+1;
        }
        else{
            high = mid-1;
        }
    }

    // if the id is not found
    return null;
}

export default binarySearch