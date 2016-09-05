(function () {

  var app = angular.module('superboxDemo', ['superbox']);

  app.controller('SuperboxCtrl', ['$scope', '$timeout', function ($scope, $timeout) {


    function editEntry(entry) {
      alert('Edit on ' + entry.title + ' invoked.');
    }

    function deleteEntry(entry) {
      alert('Delete on ' + entry.title + ' invoked.');
    }

    var dummyDesc = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invuuidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.';

    $scope.images = [
      {
        name: 'Camera',
        description: dummyDesc,
        alt: 'Alt',
        img_thumb: 'img/superbox/superbox-thumb-1.jpg',
        img_full: 'img/superbox/superbox-full-1.jpg',
        status: 'status or short image description',
      },
      {
        name: 'Bridge',
        description: dummyDesc,
        alt: 'Alt',
        img_thumb: 'img/superbox/superbox-thumb-2.jpg',
        img_full: 'img/superbox/superbox-full-2.jpg',
        status: 'status or short image description'
      },
      {
        name: 'Rails',
        description: dummyDesc,
        alt: 'Alt',
        img_thumb: 'img/superbox/superbox-thumb-3.jpg',
        img_full: 'img/superbox/superbox-full-3.jpg',
        status: 'status or short image description'
      },
      {
        name: 'Car',
        description: dummyDesc,
        alt: 'Alt',
        img_thumb: 'img/superbox/superbox-thumb-4.jpg',
        img_full: 'img/superbox/superbox-full-4.jpg',
        status: 'status or short image description'
      },
      {
        name: 'Lamp',
        description: dummyDesc,
        alt: 'Alt',
        img_thumb: 'img/superbox/superbox-thumb-5.jpg',
        img_full: 'img/superbox/superbox-full-5.jpg',
        status: 'status or short image description'
      },
      {
        name: 'Golden Gate',
        description: dummyDesc,
        alt: 'Alt',
        img_thumb: 'img/superbox/superbox-thumb-6.jpg',
        img_full: 'img/superbox/superbox-full-6.jpg',
        status: 'status or short image description'

      },
      {
        name: 'Dancing',
        description: dummyDesc,
        alt: 'Alt',
        img_thumb: 'img/superbox/superbox-thumb-7.jpg',
        img_full: 'img/superbox/superbox-full-7.jpg',
        status: 'status or short image description'

      },
      {
        name: 'Black & White',
        description: dummyDesc,
        alt: 'Alt',
        img_thumb: 'img/superbox/superbox-thumb-8.jpg',
        img_full: 'img/superbox/superbox-full-8.jpg',
        status: 'status or short image description'

      },
      {
        name: 'Smoke',
        description: dummyDesc,
        alt: 'Alt',
        img_thumb: 'img/superbox/superbox-thumb-9.jpg',
        img_full: 'img/superbox/superbox-full-9.jpg',
        status: 'status or short image description'

      },
      {
        name: 'Time',
        description: dummyDesc,
        alt: 'Alt',
        img_thumb: 'img/superbox/superbox-thumb-10.jpg',
        img_full: 'img/superbox/superbox-full-10.jpg',
        status: 'status or short image description'

      },
      {
        name: 'Fashion',
        description: dummyDesc,
        alt: 'Alt',
        img_thumb: 'img/superbox/superbox-thumb-11.jpg',
        img_full: 'img/superbox/superbox-full-11.jpg',
        status: 'status or short image description'

      },
      {
        name: 'Light',
        description: dummyDesc,
        alt: 'Alt',
        img_thumb: 'img/superbox/superbox-thumb-12.jpg',
        img_full: 'img/superbox/superbox-full-12.jpg',
        status: 'status or short image description'

      },
      {
        name: 'Adventure',
        description: dummyDesc,
        alt: 'Alt',
        img_thumb: 'img/superbox/superbox-thumb-13.jpg',
        img_full: 'img/superbox/superbox-full-13.jpg',
        status: 'status or short image description'

      },
      {
        name: 'Music',
        description: dummyDesc,
        alt: 'Alt',
        img_thumb: 'img/superbox/superbox-thumb-14.jpg',
        img_full: 'img/superbox/superbox-full-14.jpg',
        status: 'status or short image description'

      },
      {
        name: 'Clock',
        description: dummyDesc,
        alt: 'Alt',
        img_thumb: 'img/superbox/superbox-thumb-15.jpg',
        img_full: 'img/superbox/superbox-full-15.jpg',
        status: 'status or short image description'

      },
      {
        name: 'Wild',
        description: dummyDesc,
        alt: 'Alt',
        img_thumb: 'img/superbox/superbox-thumb-16.jpg',
        img_full: 'img/superbox/superbox-full-16.jpg',
        status: 'status or short image description'

      },
      {
        name: 'Winter',
        description: dummyDesc,
        alt: 'Alt',
        img_thumb: 'img/superbox/superbox-thumb-17.jpg',
        img_full: 'img/superbox/superbox-full-17.jpg',
        status: 'status or short image description'
      },
      {
        name: 'Winter',
        description: dummyDesc,
        alt: 'Alt',
        img_thumb: 'img/superbox/superbox-thumb-18.jpg',
        img_full: 'img/superbox/superbox-full-18.jpg',
        status: 'status or short image description'
      },
      {
        name: 'Winter',
        description: dummyDesc,
        alt: 'Alt',
        img_thumb: 'img/superbox/superbox-thumb-19.jpg',
        img_full: 'img/superbox/superbox-full-19.jpg',
        status: '<strong>status</strong> or short image description'
      },
      {
        name: 'Winter',
        description: dummyDesc,
        alt: 'Alt',
        img_thumb: 'img/superbox/superbox-thumb-20.jpg',
        img_full: 'img/superbox/superbox-full-20.jpg',
        status: 'status or short image description'
      },
      {
        name: 'Winter',
        description: dummyDesc,
        alt: 'Alt',
        img_thumb: 'img/superbox/superbox-thumb-21.jpg',
        img_full: 'img/superbox/superbox-full-21.jpg',
        status: 'status or short image description'
      },
      {
        name: 'Winter',
        description: dummyDesc,
        alt: 'Alt',
        img_thumb: 'img/superbox/superbox-thumb-22.jpg',
        img_full: 'img/superbox/superbox-full-22.jpg',
        status: 'status or short image description'
      },
      {
        name: 'Winter',
        description: dummyDesc,
        alt: 'Alt',
        img_thumb: 'img/superbox/superbox-thumb-23.jpg',
        img_full: 'img/superbox/superbox-full-23.jpg',
        status: 'status or short image description'
      },
      {
        name: 'Winter',
        description: dummyDesc,
        alt: 'Alt',
        img_thumb: 'img/superbox/superbox-thumb-24.jpg',
        img_full: 'img/superbox/superbox-full-24.jpg',
        status: 'status or short image description'
      }
    ];


    $timeout(function () {
      var newEntry = {
        uuid: $scope.images.length + 1,
        name: 'Camera',
        description: dummyDesc,
        alt: 'Alt',
        img_thumb: 'img/superbox/superbox-thumb-1.jpg',
        img_full: 'img/superbox/superbox-full-1.jpg'

      };
      $scope.images.push(newEntry);
    }, 8000);

    $scope.actions = [
      {
        label: 'Edit',
        action: editEntry
      },
      {
        label: 'Delete',
        action: deleteEntry
      }
    ];

  }]);

}());
