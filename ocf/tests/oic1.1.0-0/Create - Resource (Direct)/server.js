// Copyright 2016 Intel Corporation
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var ocf = require( process.argv[ 3 ] );

ocf.device.name = "test-device-" + process.argv[ 2 ];

console.log( JSON.stringify( { assertionCount: 2 } ) );

ocf.server
	.oncreate( function( request ) {
		console.log( JSON.stringify( { assertion: "strictEqual", arguments: [
			"target" in request, false, "Server: Create request has no target"
		] } ) );
		ocf.server.register( request.data )
			.then(
				function( resource ) {
					return request.respond( resource );
				},
				function( error ) {
					return request.respondWithError( error );
				} )
			.then(
				function() {
					console.log( JSON.stringify( { assertion: "ok", arguments: [
						true, "Server: Response successfully sent"
					] } ) );
				},
				function( anError ) {
					console.log( JSON.stringify( { assertion: "ok", arguments: [
						false, "Server: Error: " +
							( "" + anError ) + "\n" + JSON.stringify( anError, null, 4 )
					] } ) );
				} );
	} );

console.log( JSON.stringify( { ready: true } ) );
