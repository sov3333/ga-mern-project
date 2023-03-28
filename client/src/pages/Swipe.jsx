import React, { useEffect, useState } from 'react'
import { ImageSwipe, ImageLike } from '../components'
import { setup1 } from '../assets/setups'
import { Container } from '@chakra-ui/react'

// TODO:
// randomly pick 1 of the items from all setups
// if user swiped before, skip to next
// if user not swiped before, show it to let user make action: swipe/like or next/dislike
// once swipe/like, update action/stat to db collections `users` to know which setups user rated and which ones liked, and `setups` to know the # of ratings and likes for each setup.
// show next setup, and repeat until all photos shown
// if all photos swiped before, show "no more new photos to show :( try again later"

const Swipe = () => {
  const [currentSetup, setCurrentSetup] = useState({});
  const [balanceSetups, setBalanceSetups] = useState([]);

  const [likedState, setLikedState] = useState(null);

  useEffect(() => {

    // run once on render (mount), to fetch all setups 
    fetch('http://localhost:8080/api/setup')
    .then(
      (data) => data.json(),
      (err) => console.log(err)
    )
    .then(
      (parsedData) => {

        // create temp array to store all setups
        let tempSetupsArray = parsedData;

        // randomly pick 1 setup (removes item from tempArray)
        let randomIndex = Math.floor(Math.random() * parsedData.length);
        let removedItem = tempSetupsArray.splice(randomIndex, 1); // returns array with 1 item

        // store randomly picked item as currentSetup to show on UI
        setCurrentSetup(removedItem[0]);

        // store remainder array (less removedItem) to balanceSetups state
        setBalanceSetups(tempSetupsArray);

        // TODO:
        //  if (user rated this setup before) {
        //   remove the item and repeat to pick next random item;
        // } else {
        //   show this setup to user;
        // }

      },
      (err) => console.log(err)
    );
      
  }, [])
    
  // if (user swipes the currentSetup) {
  //     1. write to mongodb:
  //     a) `users` collection: add `_id` of `setup`, plus `rated` is `true`, plus`liked` is `true` or `false`.
  //     b) `setups` collection: add `_id` of `user` who rated, add counter +1 to `numberRatings`, add counter +1 to `numberLikes` or `numberSkips`.
    
  //     2. update state for `action made on currentSetup`, set new `currentSetup`, set new `balanceSetups`.
    
  //     3. re-render component to show next setup.
  //   }

  const handleChildStateChange = (childState) => {
    setLikedState(childState);
  }


  // BUG / TODO : 
  // handleLiked function is using the old state of likedState instead of the updated one.

      
  // handle user click like button or swipe right on mobile
  const handleLiked = () => {
        
    console.log(`handling update!`);
    console.log(`currentSetup?`, currentSetup);

    // TODO
    // update the likedState to the latest from child before execucting the fetch PUT request
    

    if (balanceSetups.length > 0) {      

      console.log(`likedState`, likedState);

      // handle updating balanceSetups and currentSetup states after Liking
      // show next item in balanceSetups
      // update setup in db
      fetch(`http://localhost:8080/api/setup/${currentSetup._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // push new swipe object to the swipes array of this setup
          $push: {
            "swipes": {
              "userId": "Like recorded!",
              "liked": likedState,
              $currentDate: { 
                "lastModified": true,
                $type: "timestamp",
              },
            },
          },
        })
      })
      .then((res) => res.json())
      .then((updatedSetup) => {
        console.log(`updated setup with new swipe data!`, updatedSetup);


        // navigate(`/setups/${currentSetup}`);

      })
      .catch((err) => console.error({ error: err }));

      // create temp array to store all setups
      let tempBalanceArray = balanceSetups;
      // randomly pick 1 setup (removes item from tempArray)
      let randomIndex = Math.floor(Math.random() * tempBalanceArray.length);
      let removedItem = tempBalanceArray.splice(randomIndex, 1); // returns array with 1 item
      // store randomly picked item as currentSetup to show on UI
      setCurrentSetup(removedItem[0]);
      // store remainder array (less removedItem) to balanceSetups state
      setBalanceSetups(tempBalanceArray);
      console.log(`update balanceSetups state after swipe complete!`);
    } else {
      console.log("no more new photos to show :( try again later");
      setBalanceSetups([]);
    }
    
  };


      
  return (
    <Container p="10px">
      { 
        (balanceSetups.length > 0) ? (
          <>
          Swipe the image (on mobile)!
          <ImageSwipe src={currentSetup.img} onChildStateChange={handleChildStateChange} handleLiked={handleLiked} />
          Like the image
          <ImageLike src={currentSetup.img} onChildStateChange={handleChildStateChange} handleLiked={handleLiked} />
          </>
        ) : (
          <p>no more new photos to show :( try again later</p>
        )
      }
        <div>
          <h3>CURRENT SETUP</h3>
          <p>{currentSetup.title}</p>
          <img src={currentSetup.img} />
        </div>
        <div>
          <h3>BALANCE SETUPS</h3>
          {balanceSetups.map(((setup, index) => (
            <img src={setup.img} key={index} />
            )))}
        </div>
    </Container>
  )
}

export default Swipe